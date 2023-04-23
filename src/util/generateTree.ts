import FamilyMember from '../components/FamilyMember';
import genderUtils from './getGenderUtil';
import GenderType from '../constants/genderType';
import breathFirstSearch from './search';
const {getGenderType} = genderUtils;

const bfscomplete = (king: FamilyMember) => {
	const result = [];
	const pastName = new Set();
	const queue = [king];

	while (queue.length > 0) {
		const current = queue.shift();
		if (current) {
			result.push(current.myName);
			if (current.mySpouse && !pastName.has(current.mySpouse.myName)) {
				queue.push(current.mySpouse);
				pastName.add(current.mySpouse.myName);
			}

			if (current.myChildren) {
				current.myChildren.forEach(child => {
					if (!pastName.has(child.myName)) {
						queue.push(child);
						pastName.add(child.myName);
					}
				});
			}
		}
	}

	return result;
};

const generateTree = (myJson: string) => {
	const inputs: string[] = myJson.split('\n').filter(input => input);
	const numberOfMembers = inputs.length / 5;

	// Create a king
	const [name, gender, parents, spouseName, children] = inputs.slice(0, 2);
	const king = new FamilyMember(name, getGenderType(gender));

	for (let membersCount = 1; membersCount < numberOfMembers; membersCount++) {
		const [name, gender, parents, spouseName, children] = inputs.slice(membersCount * 5, (membersCount * 5) + 5);
		// Creating new member with or without parents
		let newMember;

		if (parents === 'undefined') {
			newMember = new FamilyMember(name, getGenderType(gender));
		} else {
			const [motherName, fatherName]: string[] = parents.split(', ');

			const mother = breathFirstSearch(king, motherName);

			const father = breathFirstSearch(king, fatherName);

			if (mother === undefined || father === undefined) {
				newMember = new FamilyMember(name, getGenderType(gender));
			} else {
				newMember = new FamilyMember(name, getGenderType(gender), [mother, father]);
				mother.myChildren = [newMember];
				father.myChildren = [newMember];
			}
		}

		// Adding spouse to new member and vice versa
		const spouse: FamilyMember | undefined = breathFirstSearch(king, spouseName);

		if (spouse) {
			spouse.mySpouse = newMember;
			newMember.mySpouse = spouse;
		}
	}

	return king;
};

export default generateTree;
