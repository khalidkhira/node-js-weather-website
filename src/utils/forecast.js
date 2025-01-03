// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");

const foreCast = (lat, long, callback) => {
  const url =
    "https://api.weatherstack.com/forecast?access_key=a552d9949103b07fbdb7e4295ec885cb&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to servers", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const currentTemp = body.current.temperature;
      const feelslikeTemp = body.current.feelslike;
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          currentTemp +
          " degrees out. It feels like " +
          feelslikeTemp +
          " degrees out."
      );
    }
  });
};

module.exports = foreCast;
