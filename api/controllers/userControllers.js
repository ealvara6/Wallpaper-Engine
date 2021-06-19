'use strict';
const { json } = require('express');
const errorController = require('../controllers/errorController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');
var mongoose = require('mongoose'),
    User = mongoose.model('Users');



exports.create_a_user = (req, res) => {
    //validating and saving user info
    var new_user = new User(req.body);
    new_user.save((err, user) => {
        if(err)
            return errorController(err, res);
        return res.json({message: "User successfully created!"});
    })
}

exports.login_user = (req, res) => {
    

    const errors = validationResult(req.body);

    //check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }


    const {email, password} = req.body;
    User.findOne({email: email}, (err, user) => {
        if (!user)
            return res.status(400).json({
            errors: {msg: "User Does Not Exist.", param: "email" }
        });
        bcrypt.compare(password, user.password).then((result) => {
            console.log(result);
            if(!result){
                return res.status(400).json({
                    errors: {msg: "Password Is Invalid.", param: "password"}
                });
            }
        }).then(() => {
        //creating JWT token
            const payload = {
                user: {
                    id: user._id
                }
            };

            jwt.sign(
                payload,
                "test123",
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        token,
                        loggedIn: true
                    });
                }
            )
        });
    })
}

exports.get_user_info = (req, res) => {
    User.findById(req.user.id, (err, user) => {
        try{
            res.json(user);
        }
        catch{
            console.log(err);
        }
    })
}

exports.update_user_info = (req, res) => {
    
    const updateDoc = req.body;
    User.findById({_id: req.user.id},async  (err, user) => {
        if(err)
            return errorController(err, res);
        if(user.first_name !== updateDoc.first_name)
            user.first_name = updateDoc.first_name;
        if(user.last_name !== updateDoc.last_name)
            user.last_name = updateDoc.last_name;
        if(user.email !== updateDoc.email)
            user.email = updateDoc.email;
        if(user.password !== updateDoc.password)
            user.password = updateDoc.password

        await user.save((err, user) => {
            if(err)
                return res.json(err);
            res.json({message: 'User successfully updated!'});
        })
    })
    }

exports.delete_account = (req, res) => {
    const filter = {_id: req.user.id};

    User.deleteOne(filter, () => {
        try{
            res.json('user successfully deleted.');
        }
        catch(err){
            res.json(err);
        }
    })
}


exports.user_favorite = (req, res) => {
    const filter = {_id: req.user.id};
    const update = req.body;
    User.updateOne(
        filter,
        { $push: update}
    ,(err, user) => {
        try{
            console.log(req.body);
            res.json(user);
        }
        catch{
            res.json(err)
        }
    })
}

exports.user_get_favorites = (req, res, next) => {
    try{
        User.findById(req.user.id, (err, user) => {
            try{
                res.json(user.favorites);
            }
            catch(err) {
                res.json(err);
            }
        })
    }
    catch(err){
        next(err);
    }
}

exports.user_unfavorite = (req, res) => {
    User.updateOne(
        {_id: req.user.id},
        { $pull: req.body}
    ,(err, user) => {
        try{
            console.log(req.favorite);
            res.json(user);
        }
        catch{
            res.json(err);
        }
    })
}