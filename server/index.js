const express = require('express');
const { request, response } = require('express');
const app = express();

app.get('/', (request,response)=>{
  response.json({
    message: 'nice joke'
  });
})

app.listen(5000, ()=>{
console.log("listening on 5000");
})