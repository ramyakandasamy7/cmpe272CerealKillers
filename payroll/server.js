var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mysql = require('mysql'),
  Payroll = require('./api/models/payrollModel'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');
  
var con = mysql.createConnection({
	host: "18.208.107.185",
	user: "root",
	password: 'Cmpe272!',
	database: 'employees'
});

con.connect(function(err) {
	if (err) throw err;
	console.log("MYSQL database connected!");
});

global.con = con;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(function(req, res) {
//  res.status(404).send({url: req.originalUrl + ' not found'})
//});

var routes = require('./api/routes/payrollRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Payroll RESTful API server started on: ' + port);
