let mongoose = require('mongoose');

// create a model class
let BusinessContact = mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name is required'
    },
    number: {
        type: String,
        default: '',
        trim: true,
        required: 'Number is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email Address is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
},
    {
        collection: "businessContacts"
    });

module.exports.BusinessContact = mongoose.model('BusinessContact', BusinessContact);