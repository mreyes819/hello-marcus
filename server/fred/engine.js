const nlp = require('compromise');
const model = require('../../database-postgres/models/index.js');


let str = nlp("facebook.com");



console.log(str.urls().data());



//run string through algo
	//if algo returns an empty array
		//call the clever bot api
	//if algo returns an api
		//call api

