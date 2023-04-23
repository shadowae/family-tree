import React, {useState} from 'react';
import type GenderType from '../constants/genderType';
import type FamilyMember from './FamilyMember';
import genderUtil from '../util/getGenderUtil';
const {getGenderFromRelationType} = genderUtil;
import addChild from '../util/addChild';
import addChildOptions from '../constants/addChildOptions';
import RelationshipType from '../constants/relationshipsType';

const options = addChildOptions();

type Props = {
	tree: FamilyMember | undefined;
};

const AddChildForm: React.FC<Props> = ({tree}) => {
	const [mother, setMother] = useState('');
	const [child, setChild] = useState('');
	const [selectedRelation, setSelectedRelation] = useState(options[0].value);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addChild(tree, mother, child, getGenderFromRelationType(selectedRelation));
	};

	return (
		<div style={{padding: '20px'}}>
			<h1>problem 2: a new born</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='textInput'>{RelationshipType.Mother}: </label>
					<input
						id='textInput'
						type='text'
						value={mother}
						onChange={e => {
							setMother(e.target.value);
						}}
					/>
				</div>
				<div>
					<select
						id='dropdownInput'
						value={selectedRelation}
						onChange={e => {
							setSelectedRelation(e.target.value);
						}}
					>
						{options.map(option => (
							<option key={option.key} value={option.value}>
								{option.value}
							</option>
						))}
					</select>
					<input
						id='textInput'
						type='text'
						value={child}
						onChange={e => {
							setChild(e.target.value);
						}}
					/>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default AddChildForm;
