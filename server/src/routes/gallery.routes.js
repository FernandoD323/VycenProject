'use strict'

const galleryController = require('../controllers/gallery.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');
const upload = require('../libs/multer');


api.get('/getPrueba', galleryController.prueba);
// api.post('/uploadImage', [ mdAuth.ensureAuth, upload.single('imagen')], galleryController.uploadImage);
api.get('/getImages', [ mdAuth.ensureAuth], galleryController.getImages)

api.get('/getPhotos',  galleryController.getPhotos)
api.delete('/deletePhoto/:id', galleryController.deletePhoto)
api.post('/createPhoto', upload.single('image'), galleryController.createPhoto)

module.exports = api;