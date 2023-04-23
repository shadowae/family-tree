/* eslint-disable complexity */
import type FamilyMember from '../components/FamilyMember';
import breathFirstSearch from './search';
import getRelatives from './getRelatives';
import GetRelationShipErrorCode from '../constants/getRelationShipErrorCode';
import RelationshipType from '../constants/relationshipsType';

function getRelationship(
	tree: FamilyMember | undefined,
	name1: string,
	name2: string,
): string {
	if (!tree) {
		throw new Error(GetRelationShipErrorCode.InvalidTree);
	}

	// Find the FamilyMember objects for each name
	const person1 = breathFirstSearch(tree, name1);
	const person2 = breathFirstSearch(tree, name2);

	// Check if both names are in the family tree
	if (!person1 || !person2) {
		throw new Error(GetRelationShipErrorCode.InvalidInput);
	}

	// Check if they are the same person
	if (person1 === person2) {
		return 'same person';
	}

	// Check if they are spouses
	if (person1.mySpouse === person2) {
		return 'spouse';
	}

	// Check if they are siblings
	const siblings = getRelatives(tree, name1, RelationshipType.Siblings);
	if (typeof siblings === 'object' && siblings.includes(person2)) {
		return 'siblings';
	}

	// Check if they are parent-child
	if (person2.myParents && (person1 === person2.myParents[0] || person1 === person2.myParents[1])) {
		return 'parent';
	}

	if (person1.myParents && (person2 === person1.myParents[0] || person2 === person1.myParents[1])) {
		return 'child';
	}

	// Check if they are cousins
	const cousins = getRelatives(tree, name1, RelationshipType.Cousins);
	if (typeof cousins === 'object' && cousins.includes(person2)) {
		return 'cousins';
	}

	// Check if they are aunts or uncles
	const uncleAuntArray = [
		[RelationshipType.PaternalAunt],
		[RelationshipType.MaternalAunt],
		[RelationshipType.PaternalUncle],
		[RelationshipType.MaternalUncle],
	];

	for (const relationship of uncleAuntArray) {
		const uncleAunt = getRelatives(tree, name2, relationship[0]);
		if (typeof uncleAunt === 'object' && uncleAunt.includes(person1)) {
			return relationship[0].toLowerCase();
		}
	}

	// Check if they are nieces or nephews
	for (const relationship of uncleAuntArray) {
		const uncleAunt = getRelatives(tree, name1, relationship[0]);
		if (typeof uncleAunt === 'object' && uncleAunt.includes(person2)) {
			return 'niece/nephew';
		}
	}

	// Check if they are grandparents or grandchildren
	const grandDaughter = getRelatives(tree, name2, RelationshipType.GrandDaughter);
	if (typeof grandDaughter === 'object' && grandDaughter.includes(person1)) {
		return 'grand daughter';
	}

	const grandParents = getRelatives(tree, name1, RelationshipType.GrandDaughter);
	if (typeof grandParents === 'object' && grandParents.includes(person2)) {
		return 'grand parent';
	}

	// No known relationship found
	throw new Error(GetRelationShipErrorCode.NoRelationshipFound);
}

export default getRelationship;
