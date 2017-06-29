const nlp = require('compromise');
const model = require('../../database-postgres/models');


const Tools = {

  //find the api name

  findMatch: (str, obj) => {

    let strArr = str.split(' ');
    let result = '';

    for (var i = 0; i < strArr.length; i++) {
      for (var key in obj) {

        if (strArr[i] === key) {
          result = obj[key];

        }
      }
    }

    return result;
  },

  //find a place in the string if a place exists

  findPlace: (str) => {

    let nlpStr = nlp(str);

    if (nlpStr.places().data().length > 0) { //if place in string exists
      return nlpStr.places().data()[0].normal; //return place string
    } else {
      return '';
    }

  },

  constructWeathertext: (str, obj) => {

    let string = model.words.getWeatherString(str, obj).rain;

    let weatherObj = obj;
    let place = weatherObj.name;




    return string;





    // console.log(JSON.parse(weatherObj).name);

    // return text;

  }

};

module.exports = Tools;


