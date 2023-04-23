enum GetRelationShipErrorCode {
	InvalidTree = 'Tree is not valid',
	InvalidInput = 'Input not valid',
	SamePerson = 'Same person',
	NoRelationshipFound = 'No relationship found!',
	// Unknown is for default case, should be rare case
	Unknown = 'Unknown Error Occured',
}

export default GetRelationShipErrorCode;
