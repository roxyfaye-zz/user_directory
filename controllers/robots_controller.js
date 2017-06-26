const express = require('express');
const robots = require('../models/data.js');
const router = express.Router();




router.use('/',express.static('/styles'));
router.get('/', function(require, response) {
 response.render('index', robots);

});

module.exports = router;