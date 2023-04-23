import type FamilyMember from '../../components/FamilyMember';
import getSisters from './getSisters';
import getBrothers from './getBrothers';

const getSisterInLaw = (person: FamilyMember) => {
	const spouseSisters = [];
	const spouse = person.mySpouse;
	// Spouse’s sisters,
	if (spouse) {
		spouseSisters.push(...getSisters(spouse));
	}

	// Wives of siblings
	const siblingsSpouses = getBrothers(person).flatMap(brother => brother.mySpouse ?? []);

	const spouseSiblings = [...spouseSisters, ...siblingsSpouses];

	return spouseSiblings.filter(sibling => sibling !== person);
};

export default getSisterInLaw;
