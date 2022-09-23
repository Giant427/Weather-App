const dotenv = require('dotenv').config();
const https = require("https")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const apiKey = process.env.API_KEY;
const unit = "metric";
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get("/api/weather", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    let location = req.query["location"];
    if (location) {
        if (location !== "") {
            let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=" + unit;
            https.get(url, (httpRes) => {
                httpRes.on("data", (data) => {
                    const weatherData = JSON.parse(data);
                    console.log(weatherData);
                    res.send(weatherData);
                });
            });
        }
    }
});

module.exports = app;