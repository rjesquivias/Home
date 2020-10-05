const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv/config');

const postsRoute = require('./routes/posts')

app.use(bodyParser.json());

app.use('/posts', postsRoute);

async function callAPI() {
    var httpHeaders = { 'Authorization' : `Bearer ${process.env.TAXEE_BEARER}` }
        const myHeaders = new fetch.Headers(httpHeaders);

        const myRequest = new fetch.Request('https://taxee.io/api/v2/federal/2020', {
            method: 'GET',
            headers: myHeaders,
        });
        
        const myfetch = await fetch(myRequest)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
        
              // Examine the text in the response
              response.json().then(function(data) {
                  console.log("Got data");
                  console.log(data);
                  return data;
              });
        });
}

app.get('/', async (req, res) => {
    try{
        await callAPI()
        .then(response => {
            console.log("Hello There");
            res.send("Hello There");
        })
        
    } catch(err)
    {
        return err
    }
});

app.listen(3000, () => { 
    console.log('Listening on port 3000...');
});

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('Connected to database...'); }
);
