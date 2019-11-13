'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PayrollSchema = new Schema({
 	employee_id: {
  		type: Number,
  	  	trequired: 'Please provide the employee ID'
  	},
  	date_created: {
  		type: Date,
  	  	tdefault: Date.now
  	},
  	rate: {
  		type: Number,
  	  	trequired: 'Please provide the employee hourly rate'
  	}, 
  	status: {
  		type: [{
  	  	type: String,
  	    	enum: ['active','inactive']
  	  	}],
  	  	default: ['active']
  	},
	hours_paid: {
		type: Number,
		default: 86
	},
	total_hours: {
		type: Number,
		default: 86
	},
	tax_taken: {
		type: Number,
		default: 25
	},
	insurance: {
		type: Number,
		default: 150
	},
	retirement: {
		type: Number,
		default: 5 
	},
	pto: {
		type: Number,
		default: 0
	},
	pto_rate: {
		type: Number,
		default: 5.5
	}
});

module.exports = mongoose.model('Payroll', PayrollSchema);
