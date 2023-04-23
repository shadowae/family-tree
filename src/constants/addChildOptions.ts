import relationshipOptions from './relationshipOptions';
import RelationshipType from './relationshipsType';

const addChildOptions = () => relationshipOptions.filter(option =>
	option.value === RelationshipType.Daughter
	|| option.value === RelationshipType.Son,
);

export default addChildOptions;
