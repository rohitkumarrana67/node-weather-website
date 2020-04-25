const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/050fea87ec42a5c484110625a2178f2f/" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (response.body.error) {
      callback("Please! provide the correct address", undefinded);
    } else {
      const forecastData = response.body.currently;
      callback(undefined, {
        temperature: forecastData.temperature,
        icon: forecastData.icon,
        summary: forecastData.summary,
        humidity: forecastData.humidity,
        precip: forecastData.precipProbability,
      });
    }
  });
};

module.exports = forecast;

// const url =
//   "https://api.darksky.net/forecast/050fea87ec42a5c484110625a2178f2f/37.8267,-122.4233";

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("UNABLE TO CONNECT TO WEATHER SERVER");
//   } else if (response.body.error) {
//     console.log("Please provide the valid coordinates");
//   } else {
//     const data = response.body.currently;
//     console.log("THe temperature is: " + data.temperature);
//     console.log("CHANCES OF RAIN =" + data.precipProbability);
//   }
// });
