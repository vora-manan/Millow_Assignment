const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
const publicRoutes = require('./Routes/publicRoutes');
const MONGODB_URI = "mongodb+srv://vora-manan:Lmbju2023@cluster0.a5jpd.mongodb.net/test?authSource=admin&replicaSet=atlas-hzbzze-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', publicRoutes);


mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log("Connected");
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });