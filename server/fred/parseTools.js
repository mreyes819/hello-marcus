const nlp = require('compromise');


const Tools = {

	findMatch: (str, obj) => {

		let strArr = str.split(' ');
		let result = ''

		for (var i = 0; i < strArr.length; i++) {
			for (var key in obj) {

				if (strArr[i] === key) {
					result = obj[key]

				}
			}
		}

		return result;
	}



}

module.exports = Tools;


