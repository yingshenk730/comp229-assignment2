/*******************************
 * File name: businessContact.js
 * Name: Pak Wah WONG
 * StudentID: 301255741
 * Date: 2022.11.02
*******************************/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport')

let jwt = require('jsonwebtoken');

// create a reference to the model
let businessContactModel = require('../models/businessContact');
let BusinessContact = businessContactModel.BusinessContact;

module.exports.displayHomePage = (req, res, next) => {
    BusinessContact.find().sort('name').exec((err, businessContacts) => {
        if (err) return console.error(err);
        res.render('business_contact/contacts', { title: 'Business Contacts', BusinessContacts: businessContacts });
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business_contact/add', { title: 'Add Contact' })
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = BusinessContact({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    BusinessContact.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the business contact list
            res.redirect('/business-contact');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('business-contact/edit', {
                title: 'Edit Contact', contact: contactToEdit
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessContact({
        _id: id,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });

    BusinessContact.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the bvusiness contact list
            res.redirect('/business-contact');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the bvusiness contact list
            res.redirect('/business-contact');
        }
    });
}