import type GenderType from '../constants/genderType';

class Person {
	constructor(
		private readonly name: string,
		private readonly gender: GenderType,
		// Potentially extensible with other personal properties
	) {
		this.name = name;
	}

	get myName() {
		return this.name;
	}

	get myGender() {
		return this.gender;
	}
}

export default Person;
