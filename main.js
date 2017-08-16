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
const MongoClient = require('mongodb').MongoClient, assert = require('assert');


var url = 'mongodb://localhost:27017/robots';  


application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache' );
application.use(express.static('public'));


MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  database.close();
});

application.get('/', function (request,response) {
  MongoClient.connect(url, async function(error,database){
    var robot = await database.collection('robots').find({}).toArray();
    database.close();
    response.render('index' ,{ users: robot });
  });
});

application.get('/employed', function (request,response) {
  var id = parseInt(request.params.id);
  MongoClient.connect(url, async function(error,database){
    var robot = await database.collection('robots').find({job: { $ne: null}}).toArray();
    database.close();
    response.render('employed' ,{ users: robot });
   });
});

application.get('/needsajob', function (request,response) {
  // response.send('hello');
  var id = parseInt(request.params.id);
  MongoClient.connect(url, async function(error,database){
    var robot = await database.collection('robots').find({job: null}).toArray();
    database.close();
    response.render('needsajob' ,{ users: robot });
  });
});

application.get('/:id', function (request, response) {
    MongoClient.connect(url, async function(error,database){
    var robot = await database.collection('robots').find({ id: parseInt(request.params.id)}).toArray();
    database.close();
    response.render('individual' ,{ users: robot });
}); 
    });

application.listen(3000, function(){
    console.log('server running!')
    console.log('listening on localhost:3000')
});
