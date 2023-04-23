import type FamilyMember from '../../components/FamilyMember';
import getBrotherInLaw from './getBrotherInLaw';
import getBrothers from './getBrothers';
import getFather from './getFather';

const getPaternalUncles = (person: FamilyMember) => {
	const father = getFather(person)[0];
	if (!father) {
		return [];
	}

	// Father’s brothers,
	const fathersBrother = getBrothers(father);

	// Father’s brother-in-laws
	const fathersBrotherInLaw = getBrotherInLaw(father);

	const paternalUncles = [...fathersBrother, ...fathersBrotherInLaw];

	return paternalUncles.filter(uncle => uncle !== person);
};

export default getPaternalUncles;
