import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';

const getFather = (person: FamilyMember) => person.myParents?.filter(parent => parent.myGender === GenderType.Male) ?? [];

export default getFather;
