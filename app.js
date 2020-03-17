const express = require('express')
const app = express()

const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

//import index.js
const routes = require('./routes/index');

const path = require('path');

//db
const mongoose = require('mongoose')
const url = 'mongodb+srv://eb110:fhekjrs343Df@cluster0-rnf08.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology : true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(flash())

app.use(session({
    //secret is a key which i encrypt all the information for us
    secret: 'dupa',
    resave: false,
    saveUninitialized: false
}));

//passport function initialization
app.use(passport.initialize())
//initialize session to store our variables to be persisted
//across entire session the user has
app.use(passport.session())

//reg/login typed by user data handling (sending to post method)
app.use(express.urlencoded({ extended: false}))

//view engine
app.set('view engine', 'ejs');

//HTMl -> hbs files (layouts)
app.set('views', path.join(__dirname, 'views'));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', routes);

app.listen(process.env.PORT || 8080)