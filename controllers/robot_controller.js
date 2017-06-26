const express = require('express');
const robots = require('../models/data.js');
const router = express.Router();


router.get('/:id', function (request, response) {
    var users = robots.users;
    var id = request.params.id;
    var robot = users.find(function(user){

       if (user.id.toString() === id) {
          return true
      } 
    })


console.log(robot, 'this one')

 response.render('robots.mustache', robot);
});

module.exports = router;
