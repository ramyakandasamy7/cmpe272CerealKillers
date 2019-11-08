
'use strict';


var mongoose = require('mongoose'),
  Expense = mongoose.model('Expenses'),
  limit = mongoose.model('ExpenseLimit'),
  ExpenseImage = mongoose.model('ExpenseImage');

  var crypto = require('crypto');
  var Grid = require('gridfs-stream');
  var express = require('express');
  var multer = require('multer');
  var GridFsStorage = require('multer-gridfs-storage')
  var conn = mongoose.createConnection('mongodb://localhost/Tododb');
  let gfs;
  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')
  })
  var storage = new GridFsStorage({
    url: 'mongodb://host:27017/database',
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

  exports.get_image = function(req,res) {
    gfs.files.find().toArray((err, files) => {
      if(!files || files.length == 0) {
        return res.status(404).json({
          err: 'No Files Exist'
        })
      }
      return res.json(files);
    })
  }
  exports.display_image = function(req,res) {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      if(!file || file.length == 0) {
        return res.status(404).json({
          err: 'No File Exist'
        });
      }
      if(file.contentType ==='image/jpeg' || file.contentType === 'img/png') {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an Image"
        });
      }
    });

  }

  exports.upload_image = function(req,res) {
    res.json({file: req.file});
    /*var image = new ExpenseImage(req.body);
    image.save(function(err, image) {
      if (err)
        res.send(err);
      res.json(image);
    });*/
  };

//Expense Limit
exports.expense_limit = function(req,res) {
  limit.find({}, function(err,expenselimit) {
    res.json(expenselimit)
  });
}

exports.create_expenselimit = function(req, res) {
  var new_expense_limit = new limit(req.body);
  new_expense_limit.save(function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};

exports.read_expense_limit = function(req, res) {
  limit.findById(req.params.expenseId, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};


exports.update_expense_limit = function(req, res) {
  limit.findOneAndUpdate({_id: req.params.expenseId}, req.body, {new: true}, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};


exports.delete_expense_limit = function(req, res) {


  limit.remove({
    _id: req.params.expenseId
  }, function(err, expense) {
    if (err)
      res.send(err);
    res.json({ message: 'Expense successfully deleted' });
  });
};

//Expenses

exports.list_all_expenses = function(req, res) {
  Expense.find({}, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};




exports.create_a_expense = function(req, res) {
  var new_expense = new Expense(req.body);
  new_expense.save(function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};


exports.read_a_expense = function(req, res) {
  Expense.findById(req.params.expenseId, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};


exports.update_a_expense = function(req, res) {
  Expense.findOneAndUpdate({_id: req.params.expenseId}, req.body, {new: true}, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });
};


exports.delete_a_expense = function(req, res) {


  Expense.remove({
    _id: req.params.expenseId
  }, function(err, expense) {
    if (err)
      res.send(err);
    res.json({ message: 'Expense successfully deleted' });
  });
};