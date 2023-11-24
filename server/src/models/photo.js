'use strict'


const mongoose = require('mongoose');

const photoModel = mongoose.Schema({
    title: String,
    description: String,
    owner:String,
    price:Number,
    sex:String,
    imagePath: String
   
});

module.exports = mongoose.model('Photo', photoModel)



