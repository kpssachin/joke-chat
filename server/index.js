const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('./functions');
const monk = require('monk');
const rateLimit = require("express-rate-limit");

const app = express();
const db = monk('localhost/joketwitter'); // db name
const joke = db.get('joke');
app.use(cors()); // middle ware
app.use(express.json()) // body parser
// app.use(express.bodyParser());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1 // limit each IP to 100 requests per windowMs
});

// get request
app.get('/', (request, response) => {
  response.json({
    message: 'nice joke',
    id: '1234'
  });
})

// get request to get data
app.get('/details',(req,res)=>{
  joke.find().then(result=>res.json(result))
})

//  apply to all requests
app.use(limiter);
// post request
app.post('/details', (request, response) => {
  if (functions.isValid(request.body)) {
    const jokeDetails = {
      name: request.body.name,
      content: request.body.content,
      date: new Date()
    };
    // add to the db
    joke.insert(jokeDetails).then((result) => {
      console.log("result", result);
      response.json(result);
    }).catch((err) => {
      console.log("err", err);
    });
    // response.status(200);
  } else {
    response.status(400);
    response.json({
      message: 'missing keys'
    })
  }
})

app.listen(5000, () => {
  console.log("listening on 5000");
})