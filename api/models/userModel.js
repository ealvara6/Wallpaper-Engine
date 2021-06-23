'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator'),
    bcrypt = require('bcrypt');


var UserSchema = new Schema({
    first_name: {
        type: String,
        required: "Please enter your first name.",
        validate: [validator.isAlpha, 'Please enter a valid first name.']
    },
    last_name: {
        type: String,
        required: 'Please enter your last name.',
        validate: [validator.isAlpha, 'Please enter a valid last name.']
    },
    email: {
        type: String,
        unique: [true, 'Email is registered to another account.'],
        required: 'please enter your email address.',
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    password: {
        type: String,
        required: 'Please enter a password.',
        minLength: [4, 'password should at leasst be 4 characters long.']
    },
    hash: {
        type: String,
        default: ""
    },
    favorites: [String],
    wallpapers: [String],
    Created_date: {
        type: Date,
        default: Date.now
    },
});


//Apply this function before saving
UserSchema.pre('save', async function(next) {
    if(this.password !== this.hash){
        this.password = await bcrypt.hash(this.password, 12);
        this.hash = this.password;
    }
    next();
});


module.exports = mongoose.model('Users', UserSchema);