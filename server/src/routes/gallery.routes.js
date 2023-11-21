'use strict'

const galleryController = require('../controllers/gallery.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');
const multer = require('multer');
const upload = multer();


api.get('/getPrueba', galleryController.prueba);
api.post('/uploadImage', [ mdAuth.ensureAuth, upload.single('imagen')], galleryController.uploadImage);
api.get('/getImages', [ mdAuth.ensureAuth], galleryController.getImages)

module.exports = api;