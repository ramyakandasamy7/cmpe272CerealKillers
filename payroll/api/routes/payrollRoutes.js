'use strict';
module.exports = function(app) {
  var payroll = require('../controllers/payrollController');

  // Payroll Routes
  app.route('/payroll')
    .get(payroll.list_all_payroll)
    .post(payroll.add_new_payroll);


  app.route('/payroll/:employee_id')
    .get(payroll.read_a_payroll)
    .put(payroll.update_a_payroll)
    .delete(payroll.delete_a_payroll);

};
