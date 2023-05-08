const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers');

require('dotenv').config();

const port = process.env.port || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static("assets"));

app.use('/', router);

module.exports.startServer = async () => {
    try {
        await mongoose.connect(process.env.mongoDbURL);
        app.listen(port, (err) =>{
            if(err) {
                throw new Error(err);
            }
            console.log(`${process.env.environment} server starts at port ${port}`);
        })
    } catch (error) {
        console.log('error', error);
    }
}