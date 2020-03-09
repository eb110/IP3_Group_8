
const express = require('express');
const app = express();

const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

//layout
const expressLayouts = require('express-ejs-layouts')
const path = require('path');

app.use(flash())

app.use(session({
    //secret is a key which i encrypt all the information for us
    secret: 'dupa',
    resave: false,
    saveUninitialized: false
}))

//passport function initialization
app.use(passport.initialize())
//initialize session to store our variables to be persisted
//across entire session the user has
app.use(passport.session())

//reg/login typed by user data handling (sending to post method)
app.use(express.urlencoded({ extended: false}))

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