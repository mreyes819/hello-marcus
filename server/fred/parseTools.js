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

  findFood: (str) => {
    // adds food categories to the nlp library
    const lexicon = {
      'chinese':'Food',
      'mexican':'Food',
      'japanese':'Food',
      'sushi':'Food',
      'kimbap':'Food',
      'burrito':'Food',
      'indian':'Food',
      'italian':'Food',
      'pasta':'Food',
      'burger':'Food',
      'pizza':'Food',
      'american':'Food',
      'vegetarian':'Food',
      'healthy':'Food',
      'salad':'Food',
      'hotpot':'Food',
      'szechuan':'Food',
      'spicy':'Food',
      'chicken':'Food',
      'fried':'Food',
      'chili':'Food',
      'vietnamese':'Food',
      'pho':'Food',
      'french':'Food',
      'noodles':'Food',
      'shanghai':'Food',
      'vegan':'Food',
      'filipino':'Food',
      'tamales':'Food',
      'phillipines':'Food',
      'thai':'Food',
      'curry':'Food',
      'naan':'Food',
      'mediterannean':'Food',
      'chipotle':'Food',
      'nachos':'Food',
      'hotdog':'Food',
      'cheese':'Food',
      'beer':'Food',
      'bars':'Food',
      'alcohol':'Food',
      'drinks':'Food',
      'boba':'Food',
      'milk tea':'Food',
      'tea':'Food',
      'dessert':'Food',
      'ice cream':'Food',
      'ethiopian':'Food'
    };
    let nlpStr = nlp(str, lexicon);
    console.log(nlpStr.match('#Food').out('text'));
    return nlpStr.match('#Food').out('text') || null;
  },

  constructWeathertext: (str, obj) => {

    let weatherLogic = model.words.getWeatherString(obj)

    // let words = Object.keys(weatherLogic);

    let weatherText = Tools.findMatch(str, weatherLogic) || `Here's the weather in ${obj.name}.`;

    return weatherText;

  },
  constructFoodText: (str, obj) => {
    return `I recommend this place.`
  }

};

module.exports = Tools;


