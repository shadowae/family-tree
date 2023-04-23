import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';

const getBrothers = (person: FamilyMember) => {
	const findBrothers = (person: FamilyMember) => person.myParents?.flatMap(parent => parent.myChildren.filter(child => child !== person && child.myGender === GenderType.Male)) ?? [];

	return findBrothers(person);
};

export default getBrothers;
