var express = require('express');
var app = express();
var port = 3000;
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
  
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
