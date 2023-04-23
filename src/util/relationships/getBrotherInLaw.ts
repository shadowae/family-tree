import type FamilyMember from '../../components/FamilyMember';
import getBrothers from './getBrothers';
import getSisters from './getSisters';

const getBrotherInLaw = (person: FamilyMember) => {
	const spouseBrother = [];
	const spouse = person.mySpouse;
	// Spouse’s brother,
	if (spouse) {
		spouseBrother.push(...getBrothers(spouse));
	}

	// Husbands of siblings
	const siblingsSpouses = getSisters(person).flatMap(sister => sister.mySpouse ?? []);

	const spouseSiblings = [...spouseBrother, ...siblingsSpouses];

	return spouseSiblings.filter(sibling => sibling !== person);
};

export default getBrotherInLaw;
