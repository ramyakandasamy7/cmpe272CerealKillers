'use strict';
module.exports = function(app) {
  var payroll = require('../controllers/payrollController');

  // Payroll Routes
  app.route('/payrolls/:dept_no')
    .get(payroll.get_payroll_by_dept)
    .put(payroll.update_emp_payroll);


  app.route('/payroll/:emp_no')
    .get(payroll.get_payroll_by_emp);

};
