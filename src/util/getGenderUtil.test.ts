
import getGenderUtils from './getGenderUtil';
import GenderType from '../constants/genderType';

describe('getGenderType function', () => {
	it('should return GenderType.Male for "Male" input', () => {
		const gender = getGenderUtils.getGenderType('Male');
		expect(gender).toEqual(GenderType.Male);
	});

	it('should return GenderType.Female for "Female" input', () => {
		const gender = getGenderUtils.getGenderType('Female');
		expect(gender).toEqual(GenderType.Female);
	});
});

describe('getGenderFromRelationType function', () => {
	it('should return GenderType.Male for "Son" input', () => {
		const gender = getGenderUtils.getGenderFromRelationType('Son');
		expect(gender).toEqual(GenderType.Male);
	});

	it('should return GenderType.Female for "Daughter" input', () => {
		const gender = getGenderUtils.getGenderFromRelationType('Daughter');
		expect(gender).toEqual(GenderType.Female);
	});
});
