const getInput = (fileName: string) => async () => fetch('inputfile.txt')
	.then(async response => response.text())
	.then((myJson: string) => {
		const inputs: string[] = myJson.split('\n').filter(input => input);
		return inputs;
	});
