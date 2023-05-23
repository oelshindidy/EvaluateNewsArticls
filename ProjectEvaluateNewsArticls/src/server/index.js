const dotenv = require('dotenv');
dotenv.config();

/* URL variables for API call */
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY
const jsonSelector = "&of=json&url=";
const lang = "&lang=en";

/* Setup empty JS object to act as endpoint for all routes */
let projectData = {};
/* Setup Array to store user input */
const data = [];
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const app = express();
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

/* Middle-ware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors 
const cors = require('cors');
app.use(cors());
// Configuring express static directory
app.use(express.static('dist'));
// handle base route
app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile('index.html', { root: 'dist' })
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
});

// post route for /addDataAPI
app.post('/addDataAPI', (req, res) => {
  data.push(req.body);
  console.log(data);
  let newEntry = {
    userInput: req.body.textUser
  }
  getSentimentAPI(baseURL, apiKey, jsonSelector, newEntry.userInput, lang)
    .then(function (data) {
      projectData = data
      res.send(projectData);
    })
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
});

/* Return data to client side */
app.post('/return_data', (req, res) => {
  return { projectData };
})

app.get('/return_data', (req, res) => {
  res.send(projectData)
})

/* Function to call the API */
const getSentimentAPI = async (baseUrl, apiKey, jsonSelector, userInput, lang) => {

  const res = await fetch(baseUrl + apiKey + jsonSelector + userInput + lang)
  try {
    const data = await res.json();
        apiJsonResponse = data;
    return data;
  } catch (error) {
    console.log("Error: ", error);
    
  }
}
module.exports = app;