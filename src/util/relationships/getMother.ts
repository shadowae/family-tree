import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';

const getMother = (person: FamilyMember) => person.myParents?.filter(parent => parent.myGender === GenderType.Female) ?? [];

export default getMother;
