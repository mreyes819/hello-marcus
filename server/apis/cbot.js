const request = require('request-promise');


const cbot = {

  getResponse: (input) => {
    let query = `https://www.cleverbot.com/getreply?key=${process.env.cbot_key}&input=${input}`;
    
    return request(query)
            .then((data) => {
              return {type: 'text', api: 'cleverbot', text: JSON.parse(data).output, data: JSON.parse(data)};
            });
  }

};


module.exports = cbot;