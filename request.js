const mongoose = require('mongoose');
mongoose.model('timeoffRequest', {
    startDate:
    {
        type: Date
    },
    endDate: {
        type: Date
    }
    });

