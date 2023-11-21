'use strict'

const Report = require('../models/reports');
const { validateData } = require("../utils/validate");

exports.getReports = async (req, res) => {
    const reports = await Report.find()
        .populate({ path: 'client', select: '-password -phone -role -_id' })
        .populate({ path: 'product', select: '-date -_id', populate: 'company' });
    if (!reports) return res.status(404).send({ message: 'There are no reports' });
    return res.send({ message: 'Reports found:', reports: reports })
}

exports.createReport = async (req, res) => {
    const params = req.body;
    const data = {
        product: params.product,
        client: req.user.sub,
        quantity: params.quantity,
        date: new Date(),
    }
    const msg = validateData(data);
    if (msg) return res.status(400).send(msg);
    const reportExist = await Report.findOne({ client: data.client, product: data.product })
    if (reportExist) {
        let totalQuantity = parseInt(reportExist.quantity) + parseInt(data.quantity)
        const updateReport = await Report.findByIdAndUpdate({ _id: reportExist._id }, { quantity: totalQuantity });
        if (!updateReport) return res.status(500).send({ message: 'Cannot update this report' });
    } else {
        const report = new Report(data);
        if (!report) return res.status(500).send({ message: 'Cannot create this report' });
        await report.save();
    }
    return res.send({ message: 'Report saved' });
}