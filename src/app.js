const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// setting the paths for the express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewDirectoryPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// for setting up views using hbs handler
app.set("view engine", "hbs");
app.set("views", viewDirectoryPath); //custom views directory
hbs.registerPartials(partialsPath); //registering partials
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "WEATHER",
    name: "Rohit Kumar Rana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT",
    name: "Rohit Kumar Rana",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    message: "Do you need any help!",
    name: "ROHIT KUMAR RANA",
  });
});

app.get("/weather", (req, res) => {
  //getting value from query string
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  } else {
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({ forecastData, place });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "ROHIT KUMAR RANA",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "ROHIT KUMAR RANA",
    errorMessage: "PAGE NOT FOUND",
  });
});
app.listen(3000, () => {
  console.log("app is running on the port 3000");
});
