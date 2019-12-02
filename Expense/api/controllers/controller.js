
'use strict';
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "garagegymcloud@gmail.com",
    pass: "garagegym123!"
  }
});
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '18.208.107.185',
  port:3306,
  user     : 'root',
  password : 'Cmpe272!',
  database: 'employees'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
    /*connection.query('SELECT * from employees', function(err, result) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })*/
} else {
    console.log(err);
}
});

/*var sql = "CREATE TABLE expense_limit (id INT AUTO_INCREMENT PRIMARY KEY, employee_id INT, expense_limit INT)"
connection.query(sql, function(err,result) {
  console.log(err);
  console.log(result)
});
sql = "INSERT INTO expense_limit(employee_id, expense_limit) VALUES (10001, 10000)"
connection.query(sql, function(err, result){

});
connection.query('SELECT * from expense_limit', function(err,result) {
  console.log(result)
});
*/

/*var mongoose = require('mongoose'),
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
  var upload = multer({storage: storage});*/

  exports.showexpense = function(req, res) {
    res.render('index');
  }

  /*exports.get_image = function(req,res) {
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
    });
  };*/

//Expense Limit
exports.expense_limit = function(req,res) {
  limit.find({}, function(err,expenselimit) {
    res.json(expenselimit)
  });
}

exports.create_expenselimit = function(req, res) {
  var sql = "INSERT INTO expense_limit(employee_id, expense_limit) VALUES (" + req.body.employee_id +", " + req.body.limit + ")"
  connection.query(sql, function(err, result){
    if(err) {
      res.send(err);
    }
    else {
      res.json(result);
    }
  });
  /*var new_expense_limit = new limit(req.body);
  new_expense_limit.save(function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.read_expense_limit = function(req, res) {
  connection.query("SELECT * from expense_limit WHERE employee_id = " + req.body.employee_id, function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(result);
    }
  })
  /*limit.findById(req.params.expenseId, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.update_expense_limit = function(req, res) {
  connection.query("UPDATE expense_limit SET expense_limit = " + req.body.limit + " WHERE employee_id = " + req.body.employee_id, function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(result);
    }
  })
  /*limit.findOneAndUpdate({_id: req.params.expenseId}, req.body, {new: true}, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.delete_expense_limit = function(req, res) {


  /*limit.remove({
    _id: req.params.expenseId
  }, function(err, expense) {
    if (err)
      res.send(err);
    res.json({ message: 'Expense successfully deleted' });
  });*/
};

//Expenses

exports.list_dept_expenses = function(req, res) {
  var dept_no = req.params.dept_no;
  connection.query("SELECT e.* from current_dept_emp c, expenses e WHERE c.emp_no = e.employee_id and c.dept_no = '" + dept_no + "'", function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(result);
    }
  })
}

exports.list_emp_expenses = function(req, res) {
    connection.query('SELECT * from expenses WHERE employee_id = ' + req.params.emp_no, function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
      })
  /*Expense.find({}, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.create_a_expense = function(req, res) {
  var employee_id = req.body.employee_id;
  var amount      = req.body.amount;
  var file_path   = req.body.file_path;
  var userEmail   = 'jed.villanueva86@gmail.com'
  connection.query("INSERT INTO expenses(employee_id, amount, file_path) VALUES("  + employee_id +",'"  + amount +"','"+ file_path +"')", function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
      var mailOptions = {
        to: userEmail,
        subject: "Expense Confirmation",
        html:"Expense from user has been made."
      };
      smtpTransport.sendMail(mailOptions, (err, response) => {
            
      });
        res.json(result);
    }
})
  /*var new_expense = new Expense(req.body);
  new_expense.save(function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.read_a_expense = function(req, res) {
  var id = req.params.expenseId;
  connection.query('SELECT * from expenses WHERE id=' + "'" + id + "'", function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(result);
    }
  })
  /*Expense.findById(req.params.expenseId, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.update_a_expense = function(req, res) {
  var id = req.params.expenseId;
  var status = req.body.status;
  connection.query("UPDATE expenses SET status = '"+ status +"' WHERE id = '" + id +"'", function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(result);
    }
  })
  /*Expense.findOneAndUpdate({_id: req.params.expenseId}, req.body, {new: true}, function(err, expense) {
    if (err)
      res.send(err);
    res.json(expense);
  });*/
};

exports.delete_a_expense = function(req, res) {
  var id = req.params.expenseId;
  connection.query("DELETE FROM expenses WHERE id = " + id , function(err, result) {
    if(err) {
        res.send(err);
    }
    else {
        res.json(result);
    }
  })

  /*Expense.remove({
    _id: req.params.expenseId
  }, function(err, expense) {
    if (err)
      res.send(err);
    res.json({ message: 'Expense successfully deleted' });
  });*/
};
