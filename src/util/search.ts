import type FamilyMember from '../components/FamilyMember';

const breathFirstSearch = (king: FamilyMember | undefined, searchName: string) => {
	if (!king) {
		return undefined;
	}

	const pastName = new Set();
	const queue = [king];

	while (queue.length > 0) {
		const current = queue.shift();
		pastName.add(current?.myName);
		if (current) {
			if (current.myName === searchName) {
				return current;
			}

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

	return undefined;
};

export default breathFirstSearch;
