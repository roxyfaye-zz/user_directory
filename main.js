//install express
//install mustache-express

//require express
//require mustache-express
//require data.js


//rig up express to use mustache-express as an engine

//rig up our get end points
//rig up our assets folder

//rig up views with mustache
//add a template to views folder

//rig up mustach to render view with view data.


const express = require('express');
const mustacheExpress = require('mustache-express');
const application = express();
const robot = require('./controllers/robot_controller');
const robots = require('./controllers/robots_controller');


application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache' );



application.use(robots);
application.use(robot);

application.listen(3000, function(){
    console.log('server running!')
    console.log('listening on localhost:3000')
});
