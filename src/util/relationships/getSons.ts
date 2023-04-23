import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';

const getSons = (person: FamilyMember) => person.myChildren.filter(child => child.myGender === GenderType.Male);

export default getSons;
