
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pagesRouter = require('./controller/pages');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pagesRouter);

mongoose.connect('mongodb+srv://root:root@cluster0.hws1h.mongodb.net/ShopDB?retryWrites=true&w=majority' , {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        app.listen(7000, () => {
            console.log('MongoDB Atlas is connected and running');
    });
});