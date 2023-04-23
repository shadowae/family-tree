import type FamilyMember from '../../components/FamilyMember';
import GenderType from '../../constants/genderType';
import getDaughters from './getDaughters';

const getGranddaughters = (person: FamilyMember) => {
	const children = person.myChildren;
	const granddaughters: FamilyMember[] = [];
	children.forEach(child => {
		granddaughters.push(...getDaughters(child));
	});
	return granddaughters;
};

export default getGranddaughters;
