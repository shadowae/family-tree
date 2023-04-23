import GenderType from '../constants/genderType';
import Person from './Person';

let person: Person;

describe('Person class should', () => {
	beforeEach(() => {
		person = new Person('John Doe', GenderType.Male);
	});
	test('should set and get names and gender correctly', () => {
		expect(person.myName).toEqual('John Doe');
		expect(person.myGender).toEqual(GenderType.Male);
	});
});
