'use strict'

const reportsController = require('../controllers/reports.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');


api.get('/getReports', [mdAuth.ensureAuth], reportsController.getReports);
api.post('/createReport', [mdAuth.ensureAuth], reportsController.createReport);

module.exports = api;