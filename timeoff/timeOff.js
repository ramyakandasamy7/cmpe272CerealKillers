const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require("mysql");
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "garagegymcloud@gmail.com",
    pass: "garagegym123!"
  }
});
var mailOptions;
var con = mysql.createConnection(
  {
    host: "18.208.107.185",
    user: "root",
    password: "Cmpe272!",
    port: 3306,
    database: "employees"
  },
  { multipleStatements: true }
);
//con.createConnection({ multipleStatements: true });
con.connect(function(err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... " + err);
  }
});

function getNumWorkDays(startDate, endDate) {
  var numWorkDays = 0;
  var currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      console.log(currentDate.getDay());
      numWorkDays++;
    }
    currentDate = currentDate.addDays(1);
  }
  return numWorkDays;
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.subtractDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
/** create a request for time off for an employee by ID if there are enough PTO hours left. Send an email to the administrator that a request has been made*/
/** needs the following in req.body
 *  req.body.startDateYear,
    req.body.startDateMonth,
    req.body.startDateDay,
    req.body.endDateYear,
    req.body.endDateMonth,
    req.body.endDateDay,
    req.body.empid
 */
app.post("/createRequest", (req, res) => {
  console.log(req.body);
  var input_end_date   = new Date(req.body.end_date);
  var input_start_date = new Date(req.body.start_date);
  var emp_id           = req.body.emp_id;
  var manager_email    = req.body.manager_email;
  var numhours         = getNumWorkDays(input_start_date, input_end_date) * 8;
  var link             = "http://localhost:4000";
  var entry = {
    employee_id: emp_id,
    end_date: input_end_date,
    start_date: input_start_date,
    status: "Pending",
    numberofhours: numhours
  };
  con.query(
    "SELECT current_amount FROM pto where emp_no = ?",
    emp_id,
    function(err, results) {
      if (err) {
      } else {
        console.log("results are: " + JSON.stringify(results));
        ptoHours = parseInt(results[0].current_amount);
        console.log("Current Amount: " + ptoHours + " Num hours: " + numhours);
        if (ptoHours - numhours >= 0) {
          con.query("INSERT INTO timeoff SET ?", entry, function(err, results) {
            if (err) {
              res.status(400).json({ error: err });
            } else {
              res
                .status(200)
                .json({ message: "request added to timeoff database" });
            }
          });
        } else {
          res.status(400).json({ message: "You don't have enough hours" });
        }
      }
    }
  );

  //email address of administrator
  mailOptions = {
    to: manager_email,
    subject: "You have Received a Request",
    html:
      "Hello, You have received a request for time off. Please check this address " +
      link
  };
  smtpTransport.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  });
});
/** deletes a request. User can only delete a pending request**/
app.post("/deleterequest", function(req, res) {
  con.query(
    "SELECT status FROM timeoff WHERE id=?",
    [req.body.requestid],
    function(err, results) {
      console.log("I AM HERE" + JSON.stringify(results[0]));
      if (results[0].status == "Pending") {
        con.query(
          "DELETE FROM timeoff WHERE id =?",
          [req.body.requestid],
          function(err, results, fields) {
            if (err) {
              res.status(400).json({ error: err });
            } else {
              res
                .status(200)
                .json({ message: req.body.requestid + " is deleted" });
            }
          }
        );
      } else {
        res.status(400).json({
          message:
            "This request has already been approved. Please work with HR to reverse this"
        });
      }
    }
  );
});
//approve or decline timeoff requests and subtract from PTO table; two inputs: status & requestid. If request is approved, send email

app.post("/timeoffstatus", function(req, res) {
  var emp_ID;
  if (req.body.status == "declined") {
    con.query(
      "UPDATE timeoff SET status=? WHERE id = ?",
      ["declined", req.body.requestid, req.body.requestid],
      function(err, results, fields) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.status(200).json({ message: "request has been declined" });
        }
      }
    );
  } else {
    con.query(
      "UPDATE timeoff SET status=? WHERE id = ?",
      ["approved", req.body.requestid, req.body.requestid],
      function(err, results, fields) {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          console.log("updated");
          res.status(200).json({ message: "request has been approved" });
        }
      }
    );
    con.query(
      "SELECT employee_id, numberofhours FROM timeoff WHERE id= ? ",
      [req.body.requestid],
      function(err, data) {
        if (err) throw err;
        else {
          emp_ID = parseInt(data[0].employee_id);
          num_hours = parseInt(data[0].numberofhours);
          console.log(emp_ID + "empID number of hours" + num_hours);
          con.query(
            "SELECT current_amount FROM pto where emp_no = ?",
            [emp_ID],
            function(err, data) {
              if (err) throw err;
              else {
                var temp = parseInt(data[0].current_amount) - num_hours;
                if (temp > 0) {
                  con.query(
                    "UPDATE pto SET current_amount=? WHERE emp_no=?",
                    [temp, emp_ID],
                    function(err, data) {
                      if (err) throw err;
                      else {
                        var emailAddress = req.body.emailAddress;
                        console.log("updated!");
                        mailOptions = {
                          to: emailAddress,
                          subject: "Your Request has been approved!",
                          html:
                            "Hello, one of your PTO requests have been approved! Please log in to check your status. Your Request ID is " +
                            req.body.requestid
                        };
                        smtpTransport.sendMail(mailOptions, (err, response) => {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log(response);
                          }
                        });
                      }
                    }
                  );
                } else {
                  console.log("you don't have enough hours left");
                }
              }
            }
          );
        }
      }
    );
  }
});

//get all requests based on a specific employee_id
app.get("/employee/:emp_no", (req, res) => {
  //returns all requests
  var emp_no = req.params.emp_no;
  console.log("Getting timeoff list for emp_no: "+emp_no);
  con.query(
    "SELECT * FROM timeoff WHERE employee_id=?",
    emp_no,
    function(err, data) {
      if (err) {
        res.status(400);
	res.send({ error: err });
      } else {
	con.query("SELECT * from pto where emp_no=?", emp_no, function(moreerr,moredata) {
          if (moreerr) {
            res.status(400);
            res.send({ error: err });
          } else {
            res.status(200);
            console.log(moredata);
	    let ah = moredata[0].current_amount;
	    console.log(ah);
            res.json({ data:data, available_pto: ah });
          }
        });
      }
    }
  );
  
});

app.get("/department/:dept_no", (req, res) => {
	var dept_no = req.params.dept_no;
	con.query("SELECT * FROM timeoff;", function(err, data) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.status(200);
			res.json({ data:data });
		}
	});
});

//only if administrator, can you use this method to add more hours
app.post("/timeoffincrement", (req, res) => {
  //check if admin
  var tempinc = parseInt(req.body.increment);
  var empid = parseInt(req.body.empid);
  con.query(
    "SELECT current_amount FROM pto where emp_no = ?",
    [empid],
    function(err, data) {
      if (err) throw err;
      else {
        console.log(data[0].current_amount);
        var current = parseInt(data[0].current_amount) + tempinc;
        console.log(current);
        con.query(
          "UPDATE pto SET current_amount=? WHERE emp_no=?",
          [current, empid],
          function(err, data) {
            if (err) throw err;
            else {
              json
                .status(200)
                .message({ message: "timeoffhasbeenincremented" });
            }
          }
        );
      }
    }
  );
});

//method here to modify "status"
app.listen("4000", () => {
  console.log("up and running - time off service!");
});
