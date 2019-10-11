const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://ramyakandasamy:Bluem78@cluster0-6bivg.mongodb.net/test?retryWrites=true&w=majority",
  () => {
    console.log("Database connected --App.js");
  }
);

require("./dataBase");
const dataBase = mongoose.model("Employees");

function getNumWorkDays(startDate, endDate) {
  var numWorkDays = 0;
  var currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    // Skips Sunday and Saturday
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      numWorkDays++;
    }
    currentDate = currentDate.addDays(1);
  }
  console.log("number of work days is" + numWorkDays);
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

app.put("/employee/:id/setTimeOff/:number", (req, res) => {
  const number = parseInt(req.params.number);
  dataBase
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { timeOffTotal: number } }
    )
    .then(employee => {
      res.json(employee);
    });
});
app.put("/employee/:id/:startDate/:endDate/:startHour/:endHour", (req, res) => {
  const vstartDate = new Date(req.params.startDate).addHours(
    req.params.startHour
  );
  const vendDate = new Date(req.params.endDate).addHours(req.params.endHour);
  console.log(vendDate);
  console.log(vstartDate);
  var difference = 0;
  if (vstartDate > vendDate) {
    res.send("Invalid dates");
  }
  if (req.params.startHour <= 9) {
    startHour = 9;
  } else startHour = req.params.startHour;
  if (req.params.endHour >= 17) {
    endHour = 17;
  } else endHour = req.params.endHour;
  if (vstartDate.getDate() == vendDate.getDate()) {
    difference = endHour - startHour;
  } else {
    if (vstartDate.getDay() != 0 && vstartDate.getDay() != 6) {
      difference += 17 - startHour;
    }
    if (vendDate.getDay() != 0 && vendDate.getDay() != 6) {
      difference += endHour - 9;
    }
    difference +=
      getNumWorkDays(vstartDate.addDays(1), vendDate.subtractDays(1)) * 8;
  }
  doc = { StartDate: vstartDate, endDate: vendDate };
  dataBase.findOne({ _id: req.params.id }).then(entity => {
    if (entity.timeOffTotal - difference < 0) {
      res.json(
        "You don't have enough hours left" +
          difference +
          "number of total Hours left" +
          entity.timeOffTotal
      );
    } else {
      dataBase
        .findOneAndUpdate(
          { _id: req.params.id },
          { $push: { timeoffRequests: doc } }
        )
        .then(entity => {
          entity.timeOffTotal = entity.timeOffTotal - difference;
          entity.save();
          res.json(entity);
        });
    }
  });
});

app.put("/employee/:id/modifyDate/:dateid", (req, res) => {
  dataBase.findById(req.params.id).then(date => {
    date.timeoffRequests.id(req.params.dateid).remove();
    res.send("should be removed");
    date.save(function(err) {
      if (err) return handlError(err);
    });
  });
});
app.get("/employee/:id", (req, res) => {
  dataBase
    .findById(req.params.id)
    .then(employee => {
      if (employee) {
        res.json(employee);
      } else {
        res.send("invalid ID!");
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/employees", (req, res) => {
  dataBase
    .find()
    .then(employeesTimeOff => {
      res.json(employeesTimeOff);
    })
    .catch(err => {
      if (err) {
        res.send("can't get employee time off");
      }
    });
});
app.post("/employee", (req, res) => {
  var employee = new dataBase({
    name: req.body.name,
    timeOffTotal: req.body.timeOffTotal
  });
  employee
    .save()
    .then(() => {
      res.send("employee saved");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen("8000", () => {
  console.log("up and running - time off service!");
});
