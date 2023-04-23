import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';

const getSisters = (person: FamilyMember) => {
	const findSisters = person.myParents?.flatMap(parent => parent.myChildren.filter(child => child !== person && child.myGender === GenderType.Female)) ?? [];
	return findSisters;
};

export default getSisters;
