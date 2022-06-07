// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3500;

app.listen(port, ()=>{
    console.log(`server runs at http://localhost:${port}`);
});

// Receive data
app.get('/receivedData', (req, res)=>{
    res.send(projectData);
});

// Post Route
app.post('/addData', (req, res)=>{
    projectData = req.body;
    res.send({message: 'data added'});
});