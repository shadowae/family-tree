import React, {useState, useEffect} from 'react';
import getMotherwithMostDaughters from '../util/getMotherwithMostDaughters';
import type FamilyMember from './FamilyMember';

type Props = {
	tree: FamilyMember | undefined;
};
const MotherwithMostDaughtersForm: React.FC<Props> = ({tree}) => {
	const [motherwithMostDaughters, setMotherswithMostDaughters] = useState<string[]>([]);

	useEffect(() => {
		setMotherswithMostDaughters(getMotherwithMostDaughters(tree) as string[]);
	}, [tree]);
	return (
		<div>
			<h1>Problem 3: The Girl Child</h1>
			<h3><strong>Mother with the most daughters: </strong></h3>
			{motherwithMostDaughters.map((person: string) => <p key={person}>{person}</p>)}
		</div>
	);
};

export default MotherwithMostDaughtersForm;
