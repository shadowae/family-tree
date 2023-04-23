import type FamilyMember from '../../components/FamilyMember';
import getMother from './getMother';
import getBrothers from './getBrothers';
import getBrotherInLaw from './getBrotherInLaw';

const getMaternalUncles = (person: FamilyMember) => {
	const mother = getMother(person)[0];
	if (!mother) {
		return [];
	}

	// Father’s brothers,
	const mothersBrother = getBrothers(mother);

	// Father’s brother-in-laws
	const mothersBrotherInLaw = getBrotherInLaw(mother);

	const maternalUncles = [...mothersBrother, ...mothersBrotherInLaw];

	return maternalUncles.filter(uncle => uncle !== person);
};

export default getMaternalUncles;

