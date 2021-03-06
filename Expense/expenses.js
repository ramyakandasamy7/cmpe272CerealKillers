var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  //mongoose = require('mongoose'),
  //Expense = require('./api/models/model'), //created model loading here
  bodyParser = require('body-parser');
var cors = require('cors');
  
// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb'); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
