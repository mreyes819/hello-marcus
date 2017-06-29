import React from 'react';

export default {

  location: () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    let success = (pos) => {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    };

    let error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    return new Promise((resolve, reject) => {
      // success, error, options

    navigator.geolocation.getCurrentPosition((success, error, options) => {

      if (error) {
        reject(error);
      } else {
        resolve(success);
      }


    });


    })

  }
};

