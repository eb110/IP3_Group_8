//call express router
const express = require('express')
const router = express.Router();
//hashing feature
const bcrypt = require('bcryptjs')
//passport libary
const passport = require('passport')

const users = []

//db 
const User = require('../models/user')

//hook up passport configuration
const initializePassport = require('../passport-config')
//initialization
initializePassport(
    passport, 
       //this is getUserByEmail function in passport-config.js file
    name => users.find(user => user.name === name),
    //same stuff but for getUserById
    id => users.find(user => user.id === id)
    //atm we have initialized our passport by user typed authentication
)

require('../mongoose')
const User = require('../models/user')

const createUser = async (data) => {
    try {
        const user = new User(data)
        await user.save()
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

const MainPages = require('../controllers/MainPages')
router.get('/', MainPages.home);
router.get('/login', checkNotAuthenticated, MainPages.login);
router.get('/registration', checkNotAuthenticated, MainPages.registration);
router.get('/contact', checkAuthenticated, MainPages.contact);

const hondactr = require('../controllers/hondactr')
router.get('/honda', checkAuthenticated, hondactr.honda);
router.get('/civic', checkAuthenticated, hondactr.civic);
router.get('/hrv', checkAuthenticated, hondactr.hrv);
router.get('/crv', checkAuthenticated, hondactr.crv);

const fordctr = require('../controllers/fordctr')
router.get('/ford', checkAuthenticated, fordctr.ford);
router.get('/mustang', checkAuthenticated, fordctr.mustang);
router.get('/focus', checkAuthenticated, fordctr.focus);
router.get('/fiesta', checkAuthenticated, fordctr.fiesta);

const audictr = require('../controllers/audictr')
router.get('/audi', checkAuthenticated, audictr.audi);
router.get('/a4', checkAuthenticated, audictr.a4);
router.get('/a3', checkAuthenticated, audictr.a3);
router.get('/a5', checkAuthenticated, audictr.a5);

const bmwctr = require('../controllers/bmwctr')
router.get('/bmw', checkAuthenticated, bmwctr.bmw);
router.get('/series_1', checkAuthenticated, bmwctr.series_1);
router.get('/series_3', checkAuthenticated, bmwctr.series_3);
router.get('/series_5', checkAuthenticated, bmwctr.series_5);

const mercedesctr = require('../controllers/mercedesctr')
router.get('/mercedes', checkAuthenticated, mercedesctr.mercedes);
router.get('/a_class', checkAuthenticated, mercedesctr.a_class);
router.get('/b_class', checkAuthenticated, mercedesctr.b_class);
router.get('/c_class', checkAuthenticated, mercedesctr.c_class);

const nissanctr = require('../controllers/nissanctr')
router.get('/nissan', checkAuthenticated, nissanctr.nissan);
router.get('/juke', checkAuthenticated, nissanctr.juke);
router.get('/micra', checkAuthenticated, nissanctr.micra);
router.get('/leaf', checkAuthenticated, nissanctr.leaf);


router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

//checkNotAuthenticated,
//we are going to use passport middleware
router.post('/login',  checkNotAuthenticated, passport.authenticate('local', {
    //we are going to modify it
    successRedirect: '/',
    failureRedirect: '/login',
    //we want to flash message
    failureFlash: true
}))

router.post('/registration', checkNotAuthenticated, async (req, res) => {
    if(req.body.password !== req.body.repassword) {
        req.flash('error', 'wrong password')
        res.redirect('/registration')
    }
    else if(req.body.email !== req.body.reemail){
        req.flash('error', 'wrong email')
        res.redirect('/registration')
    }
    else{
    try{
        const listUsers = await User.find({})
        console.log(listUsers)
        cosnole.log('1')
        const checkUN = listUsers.find(x => x.userName === req.body.name)
        console.log(checkUN == null ? '2' : checkUN.userName)
        if(checkUN.userName !== null){
            req.flash('error', 'type different user name')
            res.redirect('/registration')
        }
        console.log('3')
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err)reject(err)
                resolve(hash)
            })
        })
        Console.log('all clear')
        //populate data into data structure  
        /*
        const newUser = new User({
            userName: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })      
        */
        Console.log('jest jest')
      //  await newUser.save()
        res.redirect('/login')        
    } catch{
        //if failed reload register
        console.log('tu wypierdala')
        res.redirect('/registration')
    }
}
})

//this will avoid the ability to visit pages without authentication
function checkAuthenticated(req, res, next){
    //because of passport we can use isAuthenticated function
    //this function has to be applied to the routing page
    if(req.isAuthenticated()) {
        //if user logged then go next
        return next()
    }
    //if not redirect
    res.redirect('/login')
    }
    
    //function to avoid double login
    function checkNotAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return res.redirect('/')
        }
        //next just stays your browsing as it is
        next()
    }

module.exports = router;
