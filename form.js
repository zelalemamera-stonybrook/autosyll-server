/* the following program handles the behavior of the form element in the home page of autosyll.
*/

const form = document.querySelector("form");
const textarea = document.getElementById("userinput");
const submit = document.getElementById("submit");
const output = document.getElementById("output");

async function syllabify( ){
	output.value = 'processing your input ... ';
	console.log(textarea.value);
	const response = await fetch('https://bkz4xxkc97.execute-api.us-east-2.amazonaws.com/', {
		method: 'POST',
		headers: {'Content-Type': 'text/plain',},
		body: textarea.value,
	});
	if (!response.ok){
		console.log(response.StatusCode);
		output.value = 'sorry try again later';
		return;
	}
	output.value = "";
	const stream = response.body.pipeThrough(new TextDecoderStream('utf8'));
	console.log(`stream received ${stream}`);
	const reader = stream.getReader();
	while(true){
		const {value, done} = await reader.read();
		console.log(`received and decoded chunk from sever ${value}`);
		output.value += value;
		if(done) {
			break;
		}
		}
	
}

textarea.addEventListener('click', () => {
	textarea.value = "";
	}, {once: true});
submit.addEventListener('click', syllabify)
