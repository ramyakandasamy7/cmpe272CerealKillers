const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const timeOffSchema = new Schema( {
    StartDate: {
        type: Date,
        default:null
    },
    endDate:  {
        type: Date,
        default:null
    }
});

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timeOffTotal: {
        type: Number,
        required: true
    },
    timeoffRequests:[timeOffSchema]
});


module.exports = mongoose.model('Employees',employeeSchema);
