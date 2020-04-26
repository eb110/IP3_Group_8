//call express router
const express = require('express')
const request = require('request')
const router = express.Router();
//hashing feature
const bcrypt = require('bcryptjs')
//passport libary
const passport = require('passport')

//db 
const User = require('../models/user')
//Api container
let apiWikiContainer = []

const MainPages = require('../controllers/MainPages')
router.get('/', MainPages.home);
router.get('/login', checkNotAuthenticated, MainPages.login);
router.get('/registration', checkNotAuthenticated, MainPages.registration);
router.get('/contact', checkAuthenticated, MainPages.contact);
router.get('/homeLogged', checkAuthenticated, MainPages.homeLogged);

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

//hook up passport configuration
const initializePassport = require('../passport-config')
//initialization
initializePassport(
    passport, 
       //this is getUserByEmail function in passport-config.js file
    async name => {
        const listUsers = await User.find({})
        const check = listUsers.find(x => x.userName === name)
        return check
    },
    //same stuff but for getUserById
    async id => {
        const listUsers = await User.find({})
        const check = listUsers.find(x => x.id === id)
        return check
    }
    //atm we have initialized our passport by user typed authentication
)

//checkNotAuthenticated,
//we are going to use passport middleware
router.post('/login',  checkNotAuthenticated, passport.authenticate('local', {
    //we are going to modify it
    successRedirect: '/homeLogged',
    failureRedirect: '/login',
    //we want to flash message
    failureFlash: true
}))

router.post('/contact', (req, res) => {
    req.flash('error', 'Message sent')
    res.redirect('/contact')
} )

router.post('/registration', checkNotAuthenticated, async (req, res) => {
    if (req.body.password !== req.body.repassword) {
        req.flash('error', 'Passwords do not match')
        res.redirect('/registration')
    }
    else if (req.body.email !== req.body.reemail) {
        req.flash('error', 'Emails do not match')
        res.redirect('/registration')
    }
    else {
        try {
            const listUsers = await User.find({})
            const checkUN = listUsers.find(x => x.userName === req.body.name)
            if (checkUN != null) {
                req.flash('error', 'Type different user name')
                res.redirect('/registration')
            }
            else {
                const hashedPassword = await new Promise((resolve, reject) => {
                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        if (err) reject(err)
                        resolve(hash)
                    })
                })
                //populate data into data structure            
                const newUser = new User({
                    userName: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                await newUser.save()
                res.redirect('/login')
            }
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

    router.post('/audi/audi', (req, res) => {
        apiWikiContainer = []
        let query = req.body.searchWP
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`
        request(url, function (err, response, body) {
        var wiki = JSON.parse(body)
        for (var i = 0; i < 3 && i < wiki[1].length; i++) {
        var data = wiki[3][i] 
        let shortName = data.substring(data.lastIndexOf("/") + 1)
        let apiLink = {}
        apiLink.link = data
        apiLink.name = shortName
        apiWikiContainer.push(apiLink)
        }
        res.render('audi/audi.ejs', {apiWiki: apiWikiContainer}) 
    })   
    })

    router.post('/mercedes/mercedes', (req, res) => {
        apiWikiContainer = []
        let query = req.body.searchWP
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`
        request(url, function (err, response, body) {
        var wiki = JSON.parse(body)
        for (var i = 0; i < 3 && i < wiki[1].length; i++) {
        var data = wiki[3][i] 
        let shortName = data.substring(data.lastIndexOf("/") + 1)
        let apiLink = {}
        apiLink.link = data
        apiLink.name = shortName
        apiWikiContainer.push(apiLink)
        }
        res.render('mercedes/mercedes.ejs', {apiWiki: apiWikiContainer}) 
    })   
    })

    router.post('/nissan/nissan', (req, res) =>  {
        apiWikiContainer = []
        let query = req.body.searchWP
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`
        request(url, function (err, response, body) {
        var wiki = JSON.parse(body)
        for (var i = 0; i < 3 && i < wiki[1].length; i++) {
        var data = wiki[3][i] 
        let shortName = data.substring(data.lastIndexOf("/") + 1)
        let apiLink = {}
        apiLink.link = data
        apiLink.name = shortName
        apiWikiContainer.push(apiLink)
        }
        res.render('nissan/nissan.ejs', {apiWiki: apiWikiContainer}) 
    })   
    })

    router.post('/honda/honda', (req, res) =>  {
        apiWikiContainer = []
        let query = req.body.searchWP
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`
        request(url, function (err, response, body) {
        var wiki = JSON.parse(body)
        for (var i = 0; i < 3 && i < wiki[1].length; i++) {
        var data = wiki[3][i] 
        let shortName = data.substring(data.lastIndexOf("/") + 1)
        let apiLink = {}
        apiLink.link = data
        apiLink.name = shortName
        apiWikiContainer.push(apiLink)
        }
        res.render('honda/honda.ejs', {apiWiki: apiWikiContainer}) 
    })   
    })

    router.post('/bmw/bmw', (req, res) =>  {
        apiWikiContainer = []
        let query = req.body.searchWP
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`
        request(url, function (err, response, body) {
        var wiki = JSON.parse(body)
        for (var i = 0; i < 3 && i < wiki[1].length; i++) {
        var data = wiki[3][i] 
        let shortName = data.substring(data.lastIndexOf("/") + 1)
        let apiLink = {}
        apiLink.link = data
        apiLink.name = shortName
        apiWikiContainer.push(apiLink)
        }
        res.render('bmw/bmw.ejs', {apiWiki: apiWikiContainer}) 
    })   
    })

    router.post('/ford/ford', (req, res) =>  {
        apiWikiContainer = []
        let query = req.body.searchWP
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`
        request(url, function (err, response, body) {
        var wiki = JSON.parse(body)
        for (var i = 0; i < 3 && i < wiki[1].length; i++) {
        var data = wiki[3][i] 
        let shortName = data.substring(data.lastIndexOf("/") + 1)
        let apiLink = {}
        apiLink.link = data
        apiLink.name = shortName
        apiWikiContainer.push(apiLink)
        }
        res.render('ford/ford.ejs', {apiWiki: apiWikiContainer}) 
    })   
    })





module.exports = router;
