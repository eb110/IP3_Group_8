const express = require('express');
const app = express();
//layout
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

//body parser
const bodyParser = require('body-parser');

//import index.js
const routes = require('./routes/index');

//view engine
app.set('view engine', 'ejs');

//hookup layouts
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

//HTMl -> hbs files (layouts)
app.set('views', path.join(__dirname, 'views'));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser - it has to be initiated before routes
//it helps to read data send by forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//routes
app.use('/', routes);

module.exports = app;