const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const foreCast = require("./utils/forecast.js");

const app = express();

//define path for express config
const publieDirectory = path.join(__dirname, "../public");
const veiwsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", veiwsPath);
hbs.registerPartials(partialsPath);
//
app.use(express.static(publieDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather App",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need Help ?",
    help: "This is your help page",
    name: "andrew Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  const addressData = req.query.address;
  console.log(addressData);
  geoCode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "something went wrong",
        });
      }
      foreCast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          console.log(error);
          return res.send({
            error: "cannot get data",
          });
        }
        res.send({
          title: "Weather",
          location: location,
          forecast: forecastData,
          name: "andrew Mead",
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "khalid",
    errorMessage: "Help article not found ",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "khalid",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
