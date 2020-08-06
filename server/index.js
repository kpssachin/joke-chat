const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('./functions');
const monk = require('monk');

const app = express();
const db = monk('localhost/joketwitter'); // db name
const joke = db.get('joke');
app.use(cors()); // middle ware
app.use(express.json()) // body parser
// app.use(express.bodyParser());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// get request
app.get('/', (request, response) => {
  response.json({
    message: 'nice joke',
    id: '1234'
  });
})

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
// get request to get data
app.get('/details',(req,res)=>{
  joke.find().then(result=>res.json(result))
})

app.listen(5000, () => {
  console.log("listening on 5000");
})