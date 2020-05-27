var aylien = require("aylien_textapi");
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv');
dotenv.config();

const app = express()

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// POST ROUTE

app.get('/test', function (req, res) {
    console.log(req.body);
    res.send(req.body);
    res.send(mockAPIResponse)
    textapi.sentiment({
        'url': req.body.text
      }, function(error, response) {
          res.send(response)
          console.log(response)
      });
})