import FamilyMember from '../components/FamilyMember';
import getMotherwithMostDaughters from './getMotherwithMostDaughters';
import GenderType from '../constants/genderType';
import fs from 'fs';
import generateTree from './generateTree';

describe('getMotherwithMostDaughters', () => {
	let familyTree: FamilyMember;

	beforeEach(() => {
		const readInput = fs.readFileSync('./__mock__/inputfile.txt', 'utf8');
		familyTree = generateTree(readInput);
	});

	test('should return the name of the mother(s) with the most daughters', () => {
		expect(getMotherwithMostDaughters(familyTree)).toEqual(['Satya', 'Lika', 'Jaya', 'Jnki']);
	});

	test('should return an empty array if there are no mothers with daughters', () => {
		const shan = new FamilyMember('Shan', GenderType.Male);
		const anga = new FamilyMember('Anga', GenderType.Female);
		shan.mySpouse = anga;
		const ish = new FamilyMember('Ish', GenderType.Male);
		const isha = new FamilyMember('Isha', GenderType.Male);
		ish.mySpouse = isha;

		shan.myChildren = [ish];
		anga.myChildren = [ish];

		expect(getMotherwithMostDaughters(shan)).toEqual([]);
	});

	test('should return an empty array if the family tree is empty', () => {
		expect(getMotherwithMostDaughters(undefined)).toEqual([]);
	});
});
