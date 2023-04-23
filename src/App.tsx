
import React, {useEffect, useState} from 'react';
import './App.css';
import type FamilyMember from './components/FamilyMember';
import AddChildForm
	from './components/AddChildForm';
import FindRelationForm from './components/FindRelationForm';
import FindRelationshipForm from './components/FindRelationshipForm';
import MotherwithMostDaughtersForm from './components/MotherwithMostDaughtersForm';
import generateTree from './util/generateTree';
import breathFirstSearch from './util/search';

function App() {
	const [tree, setTree] = useState<FamilyMember | undefined>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('inputfile.txt');
			const myText = await response.text();
			const theTree = generateTree(myText);
			setTree(theTree);
		};

		void fetchData();
	}, []);

	return (
		<div className='App'>
			<FindRelationForm tree={tree}/>
			<AddChildForm tree={tree} />
			<MotherwithMostDaughtersForm tree={tree} />
			<FindRelationshipForm tree={tree}/>
		</div>
	);
}

export default App;
