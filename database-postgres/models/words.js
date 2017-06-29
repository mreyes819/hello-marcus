const db = require('../db-config.js');


const Words = {


  getAllWords: () => {
    return db.query('select * from words');
  },

  getWordsApiMatch: () => {
    let query = `select w.word, a.name as "api" from words w inner join apis a on (a.id = w.api_id)`;
    return db.query(query)
            .then((data) => {
              return Words.convertWordsApiData(data);
            });
  },

  getApiFromWord: (word) => {
    let query = `select w.word, a.name as "api" from words w inner join apis a on (a.id = w.api_id) where w.word LIKE '%${word}%'`;
    
    return db.query(query);
  },
  

  convertWordsApiData: (data) => {

    let obj = {}

    data.forEach((match) => {
      obj[match.word] = match.api;
    })

    return obj;

  }


};


module.exports = Words;
