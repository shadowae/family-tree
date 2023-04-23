import React, {useState, useEffect} from 'react';
import type GenderType from '../constants/genderType';
import type FamilyMember from './FamilyMember';
import genderUtil from '../util/getGenderUtil';
import getRelatives from '../util/getRelatives';
const {getGenderFromRelationType} = genderUtil;
import relationshipOptions from '../constants/relationshipOptions';

type Props = {
	tree: FamilyMember | undefined;
};

const FindRelationForm: React.FC<Props> = ({tree}) => {
	const [person, setPerson] = useState('');
	const [selectedRelation, setSelectedRelation] = useState(relationshipOptions[0].value);
	const [result, setResult] = useState<FamilyMember[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		setResult([]);
		setError('');
	}, [person, selectedRelation, setResult, setError]);

	const displayResults = () => `${person}'s ${selectedRelation}: ${result.map((person: FamilyMember) => person.myName).join(', ')}`;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (tree) {
			const response = getRelatives(tree, person, selectedRelation);
			if (typeof response === 'string') {
				setError(response);
			} else {
				setResult(response);
			}
		}
	};

	return (
		<div style={{padding: '20px'}}>
			<h1>problem 1: meet the family</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='textInput'>Person: </label>
					<input
						id='textInput'
						type='text'
						value={person}
						onChange={e => {
							setPerson(e.target.value);
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
						{relationshipOptions.map(option => (
							<option key={option.key} value={option.value}>
								{option.value}
							</option>
						))}
					</select>
				</div>
				<button type='submit'>Submit</button>
			</form>
			<p style={{padding: '10px'}}>{result.length > 0 && displayResults()}</p>
			<p>{error && `Error: ${error}`}</p>
		</div>
	);
};

export default FindRelationForm;
