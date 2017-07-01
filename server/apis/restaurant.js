const request = require('request-promise');
const fredTools = require('../fred/parseTools');
require('dotenv').config();


const restaurant = {

  getResponse: (loc, placeStr, originalStr) => {
    var options = {
      uri: `https://api.yelp.com/v3/businesses/search?term=food&longitude=${loc.lon}&latitude=${loc.lat}&sort_by=rating`,
      method: 'GET',
      headers: {
        'User-Agent': 'Hello-Marcus',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: { 'bearer': `${process.env.yelp_token}` },
      json: true
    };

    return request(options)
    .then((yelpData) => {

      let restaurantData = yelpData.businesses[0];
      let restaurantDetails = {
        name: restaurantData.name,
        image: restaurantData.image_url,
        numReviews: restaurantData.review_count,
        rating: restaurantData.rating,
        website: restaurantData.url
      }
      

      let response = fredTools.constructFoodText(originalStr, restaurantData);
      
      let apiResponse = {
        type: 'widget',
        api: 'yelp',
        text: response,
        data: restaurantDetails
      };
      console.log(apiResponse)
      return apiResponse;
    });
  }

};

module.exports = restaurant;