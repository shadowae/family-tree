import type FamilyMember from '../../components/FamilyMember';
import getSiblings from './getSiblings';

const getCousins = (person: FamilyMember) => {
	const parents = person.myParents;
	if (!parents) {
		return [];
	}

	const auntsAndUncles = parents.flatMap(parent => getSiblings(parent));
	const cousins = auntsAndUncles.flatMap(auntOrUncle => auntOrUncle.myChildren.filter(cousin => cousin !== person));
	return cousins;
};

export default getCousins;
