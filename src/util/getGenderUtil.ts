import GenderType from '../constants/genderType';

const getGenderType = (gender: string) => gender === 'Male' ? GenderType.Male : GenderType.Female;
const getGenderFromRelationType = (relation: string) => relation === 'Son' ? GenderType.Male : GenderType.Female;

export default {
	getGenderType,
	getGenderFromRelationType,
};
