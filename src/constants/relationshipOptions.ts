import RelationshipType from './relationshipsType';

const relationshipOptions: Array<{
	key: string;
	value: string;
}> = Object.entries(RelationshipType)
	.map(([key, value]) => ({key, value}));

export default relationshipOptions;
