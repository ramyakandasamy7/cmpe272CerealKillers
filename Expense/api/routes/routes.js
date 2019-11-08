'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/controller');
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');

  app.use(bodyParser.json());
  app.use(methodOverride('_method'));
  app.set('view engine', 'ejs');
  // todoList Routes
  app.route('/userexpense')
    .get(todoList.expense_limit)
    .post(todoList.create_expenselimit);

    app.route('/userexpense/:expenseId')
    .get(todoList.read_expense_limit)
    .put(todoList.update_expense_limit)
    .delete(todoList.delete_expense_limit);


    var path = require('path')
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
    var upload = multer({storage: storage});

  app.route('/expenseimage')
  .get(todoList.get_image)
  .post(upload.single('file'), todoList.upload_image);

  app.route('/expenseimage/:filename')
  .get(todoList.display_image);


  app.route('/expenses')
    .get(todoList.list_all_expenses)
    .post(todoList.create_a_expense);


  app.route('/expenses/:expenseId')
    .get(todoList.read_a_expense)
    .put(todoList.update_a_expense)
    .delete(todoList.delete_a_expense);
};
