import type FamilyMember from '../../components/FamilyMember';
import getMother from './getMother';
import getSisterInLaw from './getSisterInLaw';
import getSisters from './getSisters';

const getMaternalUncles = (person: FamilyMember) => {
	const mother = getMother(person)[0];
	if (!mother) {
		return [];
	}

	// Mother’s sisters,
	const mothersSister = getSisters(mother);

	// Mother’s sister-in-laws
	const mothersSisterInLaw = getSisterInLaw(mother);

	const maternalUncles = [...mothersSister, ...mothersSisterInLaw];

	return maternalUncles.filter(uncle => uncle !== person);
};

export default getMaternalUncles;
