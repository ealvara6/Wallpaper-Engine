'use strict';

const { json } = require('express');

var mongoose = require('mongoose'),
    Contact = mongoose.model('Contacts');

exports.list_all_contacts =  (req, res) => {
    Contact.find({}, (err, contacts) => {
        if(err)
            res.send(err);
        res.json(contacts);
    });
};

exports.create_a_contact = (req, res) => {
    var new_contact = new Contact(req.body);
    new_contact.save((err, contact) => {
        if(err)
            res.send(err);
        res.json(contact);
    });
};

exports.read_a_contact = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if(err)
            res.send(err);
        res.json(contact);
    });
};

exports.update_a_contact = (req, res) => {
    Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, {new: true}, (err, contact) => {
        if(err)
            res.send(err);
        res.json(contact);
    });
};

exports.delete_a_contact = (req, res) => {
    Contact.remove({_id: req.params.contactId}, (err, contact) => {
        if(err)
            json.send(err);
        res.json({ message: 'Contact successfully deleted'});
    });
};