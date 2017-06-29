const nlp = require('compromise');
const model = require('../../database-postgres/models/index.js');


let str = nlp("facebook.com");

let testStr = "How is the weather today fog clam chowder";

let findMatch = (str, obj) => {
	console.log('ran find match')

	let strArr = str.split(' ');
	// console.log(strArr);
	// console.log(obj)

	for (var i = 0; i < strArr.length; i++) {
		for (var key in obj) {

			if (strArr[i] === key) {
				return obj[key]
			}
		}
	}


}


model.words.getWordsApiMatch()
	.then((data) => {
		return findMatch(testStr, data);
	})
	.then((api) => {
		console.log(api)
	})




//run string through algo
	//if algo returns an empty array
		//call the clever bot api
	//if algo returns an api
		//call api

