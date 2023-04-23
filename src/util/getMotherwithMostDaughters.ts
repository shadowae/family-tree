import type FamilyMember from '../components/FamilyMember';
import GenderType from '../constants/genderType';

const getMotherwithMostDaughters = (king: FamilyMember | undefined) => {
	if (!king) {
		return [];
	}

	let winnerCounter = 0;
	const winnerList = new Set();

	const pastName = new Set();
	const queue = [king];

	while (queue.length > 0) {
		let counter = 0;
		const current = queue.shift();
		pastName.add(current?.myName);
		if (current && current.myName !== king.mySpouse?.myName) {
			if (current.mySpouse && !pastName.has(current.mySpouse.myName)) {
				queue.push(current.mySpouse);
				pastName.add(current.mySpouse.myName);
			}

			if (current.myChildren) {
				current.myChildren.forEach(child => {
					if (current.myGender === GenderType.Female && child.myGender === GenderType.Female) {
						counter++;
					}

					if (!pastName.has(child.myName)) {
						queue.push(child);
						pastName.add(child.myName);
					}
				});
			}

			if (counter > 0 && counter >= winnerCounter) {
				if (counter > winnerCounter) {
					winnerCounter = counter;
					winnerList.clear();
					winnerList.add(current.myName);
				} else {
					winnerList.add(current.myName);
				}
			}
		}
	}

	return Array.from(winnerList);
};

export default getMotherwithMostDaughters;
