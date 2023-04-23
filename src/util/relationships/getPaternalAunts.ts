import type FamilyMember from '../../components/FamilyMember';
import getFather from './getFather';
import getSisterInLaw from './getSisterInLaw';
import getSisters from './getSisters';

const getPaternalAunts = (person: FamilyMember) => {
	const father = getFather(person)[0];
	if (!father) {
		return [];
	}

	// Father’s sisters,
	const fathersSister = getSisters(father);

	// Father’s sister-in-laws
	const fathersSisterInLaw = getSisterInLaw(father);

	const paternalAunts = [...fathersSister, ...fathersSisterInLaw];

	return paternalAunts.filter(aunt => aunt !== person);
};

export default getPaternalAunts;
