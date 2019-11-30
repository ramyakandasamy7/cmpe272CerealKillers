'use strict';

var sql = global.con;

exports.list_all_payroll = function(req, res) {
	sql.query("SELECT * FROM payroll", function(err, result) {
		if (err) {
			res.send(err);
		} else {
			res.json(result);
		}
	});
  //Payroll.find({}, function(err, payroll) {
  //  if (err)
  //    res.send(err);
  //  res.json(payroll);
  //});
};

exports.add_new_payroll = function(req, res) {
	let e_id = req.body;
	console.log(e_id);
	//sql.query("INSERT");
  //var new_payroll = new Payroll(req.body);
  //new_payroll.save(function(err, payroll) {
  //  if (err)
  //    res.send(err);
  //  res.json(payroll);
  //});
};

exports.read_a_payroll = function(req, res) {
  //Payroll.findById(req.params.employee_id, function(err, payroll) {
  //  if (err)
  //    res.send(err);
  //  res.json(payroll);
  //});
};

exports.update_a_payroll = function(req, res) {
  //Payroll.findOneAndUpdate({employee_id: req.params.employee_id}, req.body, {new: true}, function(err, payroll) {
  //  if (err)
  //    res.send(err);
  //  res.json(payroll);
  //});
};

exports.delete_a_payroll = function(req, res) {
  //Payroll.remove({
  //  employee_id: req.params.employee_id
  //}, function(err, payroll) {
  //  if (err)
  //    res.send(err);
  //  res.json({ message: 'Payroll entry successfully deleted' });
  //});
};
