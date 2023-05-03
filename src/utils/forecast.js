const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cbe7b244d6f9b0233f84c96a320e27f9&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, body.current);
        }
    })
}

module.exports = forecast;