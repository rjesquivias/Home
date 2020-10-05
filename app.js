const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');

const postsRoute = require('./routes/posts');
const taxesRoute = require('./routes/taxes');

app.use('/posts', postsRoute);
app.use('/taxes', taxesRoute);
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try{
        res.send('Hello there...');
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
