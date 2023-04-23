import breathFirstSearch from './search';
import FamilyMember from '../components/FamilyMember';
import type GenderType from '../constants/genderType';

const addChild = (king: FamilyMember | undefined, motherName: string, name: string, gender: GenderType) => {
	const mother = breathFirstSearch(king, motherName);

	if (mother === undefined || mother.mySpouse === undefined) {
		throw new Error(`${motherName} Mom or Dad not found`);
	} else {
		const newMember = new FamilyMember(name, gender, [mother, mother.mySpouse]);
		mother.myChildren = [newMember];
		mother.mySpouse.myChildren = [newMember];
	}
};

export default addChild;
