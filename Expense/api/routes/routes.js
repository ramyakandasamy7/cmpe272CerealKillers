'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/controller');
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');

  app.use(bodyParser.json());
  app.use(methodOverride('_method'));
  app.set('view engine', 'ejs');
  // todoList Routes
 /* app.route('/userexpense')
    .get(todoList.expense_limit)
    .post(todoList.create_expenselimit);

    app.route('/userexpense/:expenseId')
    .get(todoList.read_expense_limit)
    .put(todoList.update_expense_limit)
    .delete(todoList.delete_expense_limit);*/


    /*var path = require('path')
    var crypto = require('crypto');
    var Grid = require('gridfs-stream');
    var mongoose = require('mongoose');
    var multer = require('multer');
    var GridFsStorage = require('multer-gridfs-storage')
    var conn = mongoose.createConnection('mongodb://localhost/Tododb');
    let gfs;
    conn.once('open', () => {
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('uploads')
    })
    var storage = new GridFsStorage({
      url: 'mongodb://localhost/Tododb',
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
            if (err) {
              return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
              filename: filename,
              bucketName: 'uploads'
            };
            resolve(fileInfo);
          });
        });
      }
    });
    var upload = multer({storage: storage});*/

  /*app.route('/')
    .get(todoList.showexpense)*/

  /*app.route('/expenseimage')
  .post(todoList.upload_image);*/
  
  /*app.route('/expenseimage')
  .get(todoList.get_image)
  .post(upload.single('file'), todoList.upload_image);

  app.route('/expenseimage/:filename')
  .get(todoList.display_image);*/

//CALL TO GET EXPENSES OF DEPT using 'dept_no'
  app.route('/deptexpenses/:dept_no')
  .get(todoList.list_dept_expenses)

//CALL TO CREATE EXPENSES USING 'employee_id' and 'amount'
  app.route('/expenses')
  .post(todoList.create_a_expense);

  //CALL TO GET ALL EXPENSES OF ONE PERSON USING 'employee_id'
  app.route("/empexpenses/:emp_no")
    .get(todoList.list_emp_expenses);

  //CALL TO GIVE SOMEONE AN EXPENSE LIMIT USING 'employee_id' and 'limit'
  app.route("/createlimit")
    .post(todoList.create_expenselimit);

  //CALL TO UPDATE SOMEONE EXPENSE LIMIT USING 'limit' and 'employee_id'
  app.route("/updatelimit")
    .post(todoList.update_expense_limit);

  //CALL TO GET SOMEONE EXPENSE LIMIT USING 'employee_id'
  app.route("/readlimit")
    .post(todoList.read_expense_limit)

  app.route("/deletelimit")
    .post(todoList.delete_expense_limit)

  

  app.route('/expenses/:expenseId')
    .get(todoList.read_a_expense)
    .put(todoList.update_a_expense)
  
  app.route('/delete_expenses/:expenseId')
    .post(todoList.delete_a_expense);
};
