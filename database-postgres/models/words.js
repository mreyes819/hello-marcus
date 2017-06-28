const db = require('../db-config.js');


const Words = {


  getAllWords: () => {
    return db.query('select * from words');
  }
  



};


module.exports = Words;
