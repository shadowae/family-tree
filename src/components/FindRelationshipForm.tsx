import React, {useState, useEffect} from 'react';
import type FamilyMember from './FamilyMember';
import getRelationship from '../util/getRelationship';
import GetRelationShipErrorCode from '../constants/getRelationShipErrorCode';

type Props = {
	tree: FamilyMember | undefined;
};

const FindRelationshipForm: React.FC<Props> = ({tree}) => {
	const [personA, setPersonA] = useState('');
	const [personB, setPersonB] = useState('');
	const [relationship, setRelationShip] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setRelationShip('');
		setErrorMessage('');
	}, [personA, personB, setRelationShip, setErrorMessage]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const result = getRelationship(tree, personA, personB);
			console.log('FindRelationshipForm', result);

			setRelationShip(result);
		} catch (error) {
			setErrorMessage((error as {message: string}).message);
		}
	};

	return (
		<div style={{padding: '20px'}}>
			<h1>problem 4: who’s your daddy?</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='textInput'>Person A: </label>
					<input
						id='textInput'
						type='text'
						value={personA}
						onChange={e => {
							setPersonA(e.target.value);
						}}
					/>
				</div>
				<div>
					<label htmlFor='textInput'>Person B: </label>
					<input
						id='textInput'
						type='text'
						value={personB}
						onChange={e => {
							setPersonB(e.target.value);
						}}
					/>
				</div>
				<button type='submit'>Submit</button>
			</form>
			{relationship && <p>{personA} is {relationship} of {personB}</p>}
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	);
};

export default FindRelationshipForm;
