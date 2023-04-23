import type FamilyMember from '../components/FamilyMember';

type RelationshipFunctionType = Record<string, (person: FamilyMember) => FamilyMember[]>;

export default RelationshipFunctionType;
