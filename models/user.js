//for each individual user information

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email: {type: String},
    pass: {type: String},
    fname: {type: String},
    lname: {type: String},
    phone: {type: Number},
    address: {add1: {type: String},
                city: {type: String},
                state: {type: String},
                zip: {type: Number}
            }
});

module.exports = mongoose.model('User', userSchema);