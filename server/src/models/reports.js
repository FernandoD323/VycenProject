'use strict'

const mongoose = require('mongoose');

const productModel = mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    client: { type: mongoose.Schema.ObjectId, ref: 'User' },
    quantity: Number,
    date: Date,
    company: { type: mongoose.Schema.ObjectId, ref: 'Reports' }
});

module.exports = mongoose.model('Reports', productModel)