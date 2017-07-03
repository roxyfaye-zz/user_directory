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
// const robot = require('./controllers/robot_controller');
// const robots = require('./controllers/robots_controller');
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/robots';  


application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache' );



// application.use(robots);
//application.use(robot);

MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  database.close();
});

application.get('/', function (request,response) {
  // response.send('hello');
  MongoClient.connect(url, async function(error,database){
    var robot = await database.collection('robots').find({}).toArray();
    database.close();
    //response.json(robot);
    response.render('index' ,{ users: robot });
  });
});

application.get('/:id', function (request,response) {
  // response.send('hello');
  var id = parseInt(request.params.id);
  MongoClient.connect(url, async function(error,database){
    var robot = await database.collection('robots').find({id:id}).toArray();
    database.close();
    //response.json(robot);
    response.render('index' ,{ users: robot });
  });
});




application.listen(3000, function(){
    console.log('server running!')
    console.log('listening on localhost:3000')
});
