import type FamilyMember from '../components/FamilyMember';
import breathFirstSearch from './search';
import relationships from './relationships';

const getRelatives = (tree: FamilyMember, name: string, relation: string) => {
	const getPerson = breathFirstSearch(tree, name);
	const getFunction = relationships[relation];

	if (!getPerson) {
		return `Person ${name} not found in family tree`;
	}

	if (!getFunction) {
		return `Invalid relationship: ${relation}`;
	}

	const people = [...new Set(getFunction(getPerson))];

	if (people.length === 0) {
		return `No ${relation.toLowerCase()} found for ${name}`;
	}

	return people;
};

export default getRelatives;
