//call express router
const express = require('express')
const router = express.Router();

const MainPages = require('../controllers/MainPages')
router.get('/', MainPages.home);
router.get('/login', MainPages.login);
router.get('/registration', MainPages.registration);
router.get('/contact', MainPages.contact);

const hondactr = require('../controllers/hondactr')
router.get('/honda', hondactr.honda);
router.get('/civic', hondactr.civic);
router.get('/hrv', hondactr.hrv);
router.get('/crv', hondactr.crv);

const fordctr = require('../controllers/fordctr')
router.get('/ford', fordctr.ford);
router.get('/mustang', fordctr.mustang);
router.get('/focus', fordctr.focus);
router.get('/fiesta', fordctr.fiesta);

const audictr = require('../controllers/audictr')
router.get('/audi', audictr.audi);
router.get('/a4', audictr.a4);
router.get('/a3', audictr.a3);
router.get('/a5', audictr.a5);

const bmwctr = require('../controllers/bmwctr')
router.get('/bmw', bmwctr.bmw);
router.get('/series_1', bmwctr.series_1);
router.get('/series_3', bmwctr.series_3);
router.get('/series_5', bmwctr.series_5);

const mercedesctr = require('../controllers/mercedesctr')
router.get('/mercedes', mercedesctr.mercedes);
router.get('/a_class', mercedesctr.a_class);
router.get('/b_class', mercedesctr.b_class);
router.get('/c_class', mercedesctr.c_class);

const nissanctr = require('../controllers/nissanctr')
router.get('/nissan', nissanctr.nissan);
router.get('/juke', nissanctr.juke);
router.get('/micra', nissanctr.micra);
router.get('/leaf', nissanctr.leaf);

module.exports = router;