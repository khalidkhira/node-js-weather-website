const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    address +
    "&access_token=pk.eyJ1IjoiZGFuZWFsYnJhaW4xMDEiLCJhIjoiY201ZXY1OWFqMmFqbDJtcjdodmZtbHNkYyJ9.ODLkcNm9U-OIWCO10k4kdQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to servers", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      const lattitude = body.features[0].geometry.coordinates[1];
      const longitude = body.features[0].geometry.coordinates[0];
      const location = body.features[0].properties.full_address;
      callback(undefined, {
        lattitude: lattitude,
        longitude: longitude,
        location: location,
      });
    }
  });
};

module.exports = geoCode;
