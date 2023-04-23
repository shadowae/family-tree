import GenderType from '../constants/genderType';
import FamilyMember from './FamilyMember';

describe('Person class should', () => {
	test('should set and get parents correctly', () => {
		const personMom = new FamilyMember('Jane Doe', GenderType.Female);
		const personDad = new FamilyMember('Jack Doe', GenderType.Male);
		const person = new FamilyMember('Jack Doe', GenderType.Male, [personMom, personDad]);
		expect(person.myParents).toEqual([personMom, personDad]);
	});

	test('should set and get spouse correctly', () => {
		const personSpouse = new FamilyMember('Jane Doe', GenderType.Female);
		const person = new FamilyMember('Jack Doe', GenderType.Male, undefined, personSpouse);
		expect(person.mySpouse).toEqual(personSpouse);
	});

	test('should set and get children correctly', () => {
		const personDaughter = new FamilyMember('Jill Doe', GenderType.Female);
		const personSon = new FamilyMember('Jim Doe', GenderType.Male);
		const person = new FamilyMember('Jack Doe', GenderType.Male, undefined, undefined, [personDaughter, personSon]);
		expect(person.myChildren).toEqual([personDaughter, personSon]);
	});
});
