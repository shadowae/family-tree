import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';

const getDaughters = (person: FamilyMember) => person.myChildren.filter(child => child.myGender === GenderType.Female);

export default getDaughters;
