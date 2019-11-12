const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var mysql = require("mysql");
var con = mysql.createConnection(
  {
    host: "ec2-18-208-107-185.compute-1.amazonaws.com",
    user: root,
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
/** create a request for time off for an employee by ID*/
app.post(
  "/timeoff/:empid/:startDateYear/:startDateMonth/:startDateDay/:endDateYear/:endDateMonth/:endDateDay",
  (req, res) => {
    input_end_date = new Date(
      req.params.endDateYear,
      req.params.endDateMonth,
      req.params.endDateDay
    );
    console.log(req.params.endDateMonth + input_end_date);
    input_start_date = new Date(
      req.params.startDateYear,
      req.params.startDateMonth,
      req.params.startDateDay
    );
    var numhours = getNumWorkDays(input_start_date, input_end_date) * 8;
    console.log("number of hours" + numhours);
    var entry = {
      employee_id: req.params.empid,
      end_date: input_end_date,
      start_date: input_start_date,
      status: "Pending",
      numberofhours: numhours
    };

    var query = con.query("INSERT INTO timeoff SET ?", entry, function(
      err,
      results
    ) {
      if (err) throw err;
    });
    console.log(query.sql);
  }
);

//approve or deline timeoff requests and subtract from PTO table
app.post("/timeoff/:requestid/:status", function(req, res) {
  var emp_ID;
  if (req.params.status == "declined") {
    con.query(
      "UPDATE timeoff SET status=? WHERE id = ?",
      ["declined", req.params.requestid, req.params.requestid],
      function(err, results, fields) {
        if (err) throw err;
        else {
          console.log(results);
          console.log(fields);
        }
      }
    );
  } else {
    con.query(
      "UPDATE timeoff SET status=? WHERE id = ?",
      ["approved", req.params.requestid, req.params.requestid],
      function(err, results, fields) {
        if (err) throw err;
        else {
          console.log("updated");
        }
      }
    );
    con.query(
      "SELECT employee_id, numberofhours FROM timeoff WHERE id= ? ",
      [req.params.requestid],
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
                        console.log("updated!");
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
app.get("/employee/:id", (req, res) => {
  //returns all requests
  con.query(
    "SELECT * FROM timeoff WHERE employee_id=?",
    [req.params.id],
    function(err, data) {
      if (err) throw err;
      else {
        console.log(data);
      }
    }
  );
  //returns time off total
  con.query("SELECT * from pto where emp_no=?", [req.params.id], function(
    err,
    data
  ) {
    if (err) throw err;
    else {
      console.log(data);
    }
  });
});
//only if administrator, can you use this method to add more hours
app.post("/timeoffincrement/:empid/:increment", (req, res) => {
  //check if admin
  var tempinc = parseInt(req.params.increment);
  var empid = parseInt(req.params.empid);
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
              console.log("updated!");
            }
          }
        );
      }
    }
  );
});
app.listen("8000", () => {
  console.log("up and running - time off service!");
});
