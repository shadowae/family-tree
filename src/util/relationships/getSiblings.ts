import type FamilyMember from '../../components/FamilyMember';

const getSiblings = (person: FamilyMember) => person.myParents?.flatMap(parent => parent.myChildren.filter(child => child !== person)) ?? [];

export default getSiblings;
