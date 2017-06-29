const nlp = require('compromise');


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

    if (nlpStr.places().data().length > 0) {
      return nlpStr.places().data()[0].normal;
    } else {
      return '';
    }

  }

};

module.exports = Tools;


