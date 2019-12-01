'use strict';

var sql = global.con;

exports.get_payroll_by_dept = function(req, res) {
	let dept_no = req.params.dept_no
	console.log("Getting payroll info for dept_no: "+dept_no);
	sql.query("SELECT * FROM payroll WHERE dept_no='"+dept_no+"';", function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
};

exports.update_emp_payroll = function(req, res) {
	let e_id = req.body;
	console.log(e_id);
};

exports.get_payroll_by_emp = function(req, res) {
	let emp_no = req.params.emp_no
	console.log("Getting payroll info for emp_no: "+emp_no);
	sql.query("SELECT * FROM payroll WHERE emp_no="+emp_no+";", function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
};



