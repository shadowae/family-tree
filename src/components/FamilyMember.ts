
import Person from './Person';
import type ParentsType from '../type/ParentsType';
import type GenderType from '../constants/genderType';
import FamilyMemberErrorCode from '../constants/familyMemberErrorCode';
class FamilyMember extends Person {
	private generation: number;

	constructor(
		name: string,
		gender: GenderType,
		private readonly parents?: ParentsType,
		private spouse: FamilyMember | undefined = undefined,
		private children?: FamilyMember[],
	) {
		super(name, gender);
		this.parents = parents;
		this.children = children ? children : [];

		// Set generation
		if (parents) {
			this.generation = parents[0].myGeneration + 1;
		} else if (spouse) {
			this.generation = spouse.myGeneration;
		} else {
			this.generation = 1;
		}
	}

	get myParents() {
		return this.parents;
	}

	get mySpouse(): FamilyMember | undefined {
		return this.spouse;
	}

	set mySpouse(inputSpouse: FamilyMember | undefined) {
		if (!inputSpouse) {
			return;
		}

		this.spouse = inputSpouse;
		if (this.generation === 1 && inputSpouse.myGeneration > 0) {
			this.generation = inputSpouse.myGeneration;
		}

		if (inputSpouse?.myGeneration > 1 && this.generation !== inputSpouse?.myGeneration) {
			throw new Error(FamilyMemberErrorCode.SPOUSE_GENERATION_MISMATCH);
		}
	}

	get myChildren() {
		if (this.children) {
			return this.children;
		}

		return [];
	}

	set myChildren(children: FamilyMember[]) {
		if (this.children) {
			this.children = [...this.children, ...children];
		} else {
			this.children = children;
		}
	}

	get myGeneration() {
		return this.generation;
	}

	set myGeneration(inputGeneration: number) {
		this.generation = inputGeneration;
	}
}

export default FamilyMember;
