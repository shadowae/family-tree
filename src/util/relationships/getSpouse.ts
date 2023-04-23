import type FamilyMember from '../../components/FamilyMember';

const getSpouse = (person: FamilyMember) => {
	if (!person.mySpouse) {
		return [];
	}

	return [person.mySpouse];
};

export default getSpouse;
