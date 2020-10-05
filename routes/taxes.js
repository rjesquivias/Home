const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

async function callAPI(callback) {
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
                  callback(data);
              });
        });
}

router.get('/brackets', async (req, res) => {
    try {
        callAPI((data) => {
			res.send(data);
		});
    } catch(err) {
        res.json({ message: err});
    }
});

router.get('/', (req, res) => {
	res.render('login.ejs');
});

module.exports = router;