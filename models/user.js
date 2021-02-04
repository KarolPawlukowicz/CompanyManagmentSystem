const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

var userSchema = new mongoose.Schema({
    email : {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    firstName : {
        type : String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    lastName : {
        type : String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    role: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)