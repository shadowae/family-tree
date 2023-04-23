
import FamilyMember from '../components/FamilyMember';
import GenderType from '../constants/genderType';
import getRelatives from './getRelatives';
import fs from 'fs';
import generateTree from './generateTree';
import breathFirstSearch from './search';
import addChild from './addChild';
import RelationshipType from '../constants/relationshipsType';

describe('getRelatives', () => {
	let familyTree: FamilyMember;

	beforeEach(() => {
		const readInput = fs.readFileSync('./__mock__/inputfile.txt', 'utf8');
		familyTree = generateTree(readInput);
	});

	test('should return "Invalid relationship: foo" if the relationship is not valid', () => {
		const result = getRelatives(familyTree, 'King Shan', 'foo');
		expect(result).toBe('Invalid relationship: foo');
	});

	test('should return "No mothers found for King Shan" if the person has no mother', () => {
		const result = getRelatives(familyTree, 'King Shan', RelationshipType.Mother);
		expect(result).toBe('No mother found for King Shan');
	});

	test('should return the correct mother', () => {
		const result = getRelatives(familyTree, 'Chit', RelationshipType.Mother);
		expect(result).toBe('Chit\'s mother: Queen Anga');
	});

	test('should return "No father found for King Shan" if the person has no father', () => {
		const result = getRelatives(familyTree, 'King Shan', RelationshipType.Father);
		expect(result).toBe('No father found for King Shan');
	});

	test('should return the correct father', () => {
		const result = getRelatives(familyTree, 'Chit', RelationshipType.Father);
		expect(result).toBe('Chit\'s father: King Shan');
	});

	test('should return "No spouse found for Ish" if the person has no spouse', () => {
		const result = getRelatives(familyTree, 'Ish', RelationshipType.Spouse);
		expect(result).toBe('No spouse found for Ish');
	});

	test('should return the correct spouse', () => {
		const result = getRelatives(familyTree, 'Chit', RelationshipType.Spouse);
		expect(result).toBe('Chit\'s spouse: Ambi');
	});

	test('should return "No children found for Ish" if the person has no children', () => {
		const result = getRelatives(familyTree, 'Ish', 'children');
		expect(result).toBe('No children found for Ish');
	});

	test('should return the correct children', () => {
		const result = getRelatives(familyTree, 'Jaya', 'children');
		expect(result).toEqual('Jaya\'s children: Jata, Driya');
	});

	test('should return "No siblings found for Mnu" if the person has no siblings', () => {
		const result = getRelatives(familyTree, 'Mnu', 'siblings');
		expect(result).toBe('No siblings found for Mnu');
	});

	test('should return the correct siblings', () => {
		const result = getRelatives(familyTree, 'Drita', 'siblings');
		expect(result).toEqual('Drita\'s siblings: Vrita');
	});

	test('should return "No sons found for Vila" if the person has no sons', () => {
		const result = getRelatives(familyTree, 'Vila', 'son');
		expect(result).toBe('No son found for Vila');
	});

	test('should return the correct sons', () => {
		const result = getRelatives(familyTree, 'Drita', 'son');
		expect(result).toEqual('Drita\'s son: Jata');
	});

	test('should return "No daughters found for Chit" if the person has no daughters', () => {
		const result = getRelatives(familyTree, 'Chit', 'daughter');
		expect(result).toBe('No daughter found for Chit');
	});

	test('should return the correct daughters', () => {
		const result = getRelatives(familyTree, 'Vich', 'daughter');
		expect(result).toEqual('Vich\'s daughter: Chika');
	});

	test('should return "No brother found for Vila" if the person has no brother', () => {
		const result = getRelatives(familyTree, 'Vila', 'brother');
		expect(result).toBe('No brother found for Vila');
	});

	test('should return the correct brother', () => {
		const result = getRelatives(familyTree, 'Drita', 'brother');
		expect(result).toEqual('Drita\'s brother: Vrita');
	});

	test('should return "No sister found for Satya" if the person has no sister', () => {
		const result = getRelatives(familyTree, 'Satya', 'sister');
		expect(result).toBe('No sister found for Satya');
	});

	test('should return the correct sisters', () => {
		const result = getRelatives(familyTree, 'Vich', 'sister');
		expect(result).toEqual('Vich\'s sister: Satya');
	});

	describe('Cousin use case', () => {
		test('should return "No cousin found for Lavnya" if the person has no cousin', () => {
			const result = getRelatives(familyTree, 'Lavnya', 'cousins');
			expect(result).toBe('No cousins found for Lavnya');
		});

		test('should return "No cousin found for Lavnya" if the person has no parents', () => {
			const result = getRelatives(familyTree, 'Gru', 'cousins');
			expect(result).toBe('No cousins found for Gru');
		});

		test('should return the correct cousin', () => {
			const result = getRelatives(familyTree, 'Chika', 'cousins');
			expect(result).toBe('Chika\'s cousins: Drita, Vrita, Satvy, Savya, Saayan');
		});
	});

	describe('Sister in law use case', () => {
		// Spouse’s sisters, Wifes of siblings
		test('should return "No sister-in-law found for Drita" if the person has no sister-in-law', () => {
			const result = getRelatives(familyTree, 'Drita', 'sister-in-law');
			expect(result).toBe('No sister-in-law found for Drita');
		});

		// Spouse’s sisters,
		test('should return the correct sister-in-law', () => {
			const result = getRelatives(familyTree, 'Lika', 'sister-in-law');
			expect(result).toBe('Lika\'s sister-in-law: Satya');
		});

		// Wifes of siblings
		test('should return the correct sister-in-law', () => {
			const result = getRelatives(familyTree, 'Ish', 'sister-in-law');
			expect(result).toBe('Ish\'s sister-in-law: Ambi, Lika');
		});
	});

	describe('Brother in law use case', () => {
		// Spouse’s brother, Husbands of siblings
		test('should return "No brother-in-law found for Satvy" if the person has no brother-in-law', () => {
			const result = getRelatives(familyTree, 'Satvy', 'brother-in-law');
			expect(result).toBe('No brother-in-law found for Satvy');
		});

		test('should return the correct brother-in-law if there is no spouse but sister has husbands ', () => {
			const result = getRelatives(familyTree, 'Ish', 'brother-in-law');
			expect(result).toBe('Ish\'s brother-in-law: Vyan');
		});

		// Spouse’s brother
		test('should return the correct brother-in-law', () => {
			const result = getRelatives(familyTree, 'Ambi', 'brother-in-law');
			expect(result).toBe('Ambi\'s brother-in-law: Ish, Vich');
		});

		// Husbands of siblings
		test('should return the correct brother-in-law', () => {
			const result = getRelatives(familyTree, 'Vich', 'brother-in-law');
			expect(result).toBe('Vich\'s brother-in-law: Vyan');
		});
	});

	describe('Paternal Uncle use case', () => {
		// Father’s brothers, Father’s brother-in-laws
		test('should return "No paternal uncle found for Ish if the person has no paternal uncle', () => {
			const result = getRelatives(familyTree, 'Ish', 'paternal uncle');
			expect(result).toBe('No paternal uncle found for Ish');
		});

		test('should return "No paternal uncle found for Ambi if the person has no father, ie no paternal uncle', () => {
			const result = getRelatives(familyTree, 'Ambi', 'paternal uncle');
			expect(result).toBe('No paternal uncle found for Ambi');
		});

		// Father’s brothers,
		test('should return the correct paternal uncle', () => {
			const result = getRelatives(familyTree, 'Jata', 'paternal uncle');
			expect(result).toBe('Jata\'s paternal uncle: Vrita');
		});

		// Father’s brother-inlaws
		test('should return the correct paternal uncle', () => {
			const result = getRelatives(familyTree, 'Lavnya', 'paternal uncle');
			expect(result).toBe('Lavnya\'s paternal uncle: Kpila');
		});
	});

	describe('Maternal Uncle use case', () => {
		// Mother’s brothers, Mother’s brother-in-laws
		test('should return "No maternal uncle found for Jnki if the person has no maternal uncle', () => {
			const result = getRelatives(familyTree, 'Jnki', 'maternal uncle');
			expect(result).toBe('No maternal uncle found for Jnki');
		});

		test('should return "No maternal aunt found for Ambi if the person has no mother, ie no maternal uncle', () => {
			const result = getRelatives(familyTree, 'Ambi', 'maternal uncle');
			expect(result).toBe('No maternal uncle found for Ambi');
		});

		// Mother’s brothers,
		test('should return the correct maternal uncle', () => {
			const result = getRelatives(familyTree, 'Satvy', 'maternal uncle');
			expect(result).toBe('Satvy\'s maternal uncle: Ish, Chit, Vich');
		});

		// Mother’s brother-in-laws
		test('should return the correct maternal uncle', () => {
			const result = getRelatives(familyTree, 'Driya', 'maternal uncle');
			expect(result).toBe('Driya\'s maternal uncle: Vrita');
		});
	});

	describe('Paternal Aunt use case', () => {
		// Father’s sisters, Father’s sister-in-laws
		test('should return "No paternal aunt found for Ish if the person has no paternal aunt', () => {
			const result = getRelatives(familyTree, 'Jata', 'paternal aunt');
			expect(result).toBe('No paternal aunt found for Jata');
		});

		test('should return "No maternal aunt found for Ambi if the person has no father, ie no paternal aunt', () => {
			const result = getRelatives(familyTree, 'Ambi', 'paternal aunt');
			expect(result).toBe('No paternal aunt found for Ambi');
		});

		// Father’s sisters,
		test('should return the correct paternal aunt', () => {
			const result = getRelatives(familyTree, 'Lavnya', 'paternal aunt');
			expect(result).toBe('Lavnya\'s paternal aunt: Chika');
		});

		// Father’s sister-inlaws
		test('should return the correct paternal aunt', () => {
			const result = getRelatives(familyTree, 'Kriya', 'paternal aunt');
			expect(result).toBe('Kriya\'s paternal aunt: Satvy, Mina');
		});
	});

	describe('Maternal Aunt use case', () => {
		test('should return "No maternal aunt found for Ambi if the person has no mother, ie no maternal aunt', () => {
			const result = getRelatives(familyTree, 'Ambi', 'maternal aunt');
			expect(result).toBe('No maternal aunt found for Ambi');
		});

		// Mother’s sisters, Mother’s sister-in-laws
		test('should return "No maternal aunt found for Driya if the person has no maternal uncle', () => {
			const result = getRelatives(familyTree, 'Driya', 'maternal aunt');
			expect(result).toBe('No maternal aunt found for Driya');
		});

		// // Mother’s sisters,
		test('should return the correct maternal aunt', () => {
			const ish = breathFirstSearch(familyTree, 'Ish');
			if (!ish) {
				throw (new Error('ish does not exist'));
			}

			const ishWife = new FamilyMember('Jivs', GenderType.Female, undefined, ish);
			ish.mySpouse = ishWife;
			const subaHusband = new FamilyMember('Lur', GenderType.Male, undefined);

			addChild(familyTree, 'Jivs', 'Suba', GenderType.Female);
			addChild(familyTree, 'Jivs', 'Sug', GenderType.Female);

			const suba = breathFirstSearch(familyTree, 'Suba');
			if (suba) {
				suba.mySpouse = subaHusband;
			}

			addChild(familyTree, 'Suba', 'Rig', GenderType.Male);
			const rig = breathFirstSearch(familyTree, 'Rig');

			const result = getRelatives(familyTree, 'Rig', 'maternal aunt');
			expect(result).toBe('Rig\'s maternal aunt: Sug');
		});

		// Mother’s sister-in-laws
		test('should return the correct maternal aunt', () => {
			const result = getRelatives(familyTree, 'Satvy', 'maternal aunt');
			expect(result).toBe('Satvy\'s maternal aunt: Ambi, Lika');
		});
	});

	describe('Grand Daughter use case', () => {
		test('should return "No grand daughter found for Driya if the person has no grand daughter', () => {
			const result = getRelatives(familyTree, 'Driya', 'grand daughter');
			expect(result).toBe('No grand daughter found for Driya');
		});

		test('should return the correct grand daughter', () => {
			const result = getRelatives(familyTree, 'Ambi', 'grand daughter');
			expect(result).toBe('Ambi\'s grand daughter: Driya');
		});
	});
});
