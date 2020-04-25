const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicm9oaXRrdW1hcnJhbmE2NyIsImEiOiJjazYwejNvdjgwYzhjM2ZvYTg3eGg1M3N4In0.uRO7HKRoy_LVtId0D_Logw&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location service", undefined);
    } else if (response.body.features.length == 0) {
      callback(
        "Cannot find the location, Please try another search",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        place: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

// // const geocode =
// //   "https://api.mapbox.com/geocoding/v5/mapbox.places/india.json?access_token=pk.eyJ1Ijoicm9oaXRrdW1hcnJhbmE2NyIsImEiOiJjazYwejNvdjgwYzhjM2ZvYTg3eGg1M3N4In0.uRO7HKRoy_LVtId0D_Logw&limit=1";

// request({ url: geocode, json: true }, (error, response) => {
//   if (error) {
//     console.log("UNABLE TO CONNECT TO GEOCODE SERVER");
//   } else if (response.body.features.length == 0) {
//     console.log("please provide a valid address");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });
