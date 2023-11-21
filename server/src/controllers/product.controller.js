'use strict'

const Product = require('../models/products');
const Report = require('../models/reports');
const { validateData } = require("../utils/validate");

exports.createProduct = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            name: params.name,
            size: params.size,
            sex: params.sex,
            price: params.price,
            stock: params.stock,
            date: params.date,
            company: params.company
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        if (params.price < 0) return res.status(400).send({ message: 'Invalid price' });
        if (params.stock < 0) return res.status(400).send({ message: "Invalid stock" });

        const product = new Product(data);
        await product.save();
        return res.send({ message: 'Product saved' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('company').sort({ date: 1 });
        if (!products) return res.status(404).send({ message: 'There are no any products' });
        return res.send({ message: 'Products found:', products })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ _id: productId }).populate('company');
        if (!product) return res.status(404).send({ message: 'Product not found' });
        return res.send({ message: 'Product found:', product });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const params = req.body;
        if (params.price < 0) return res.status(400).send({ message: 'Invalid price' });
        const product = await Product.findOne({ _id: productId });
        if (!product) return res.status(404).send({ message: 'Product not found' });
        const update = await Product.findByIdAndUpdate({ _id: productId }, params, { new: true });
        if (!update) return res.status(500).send({ message: 'Cannot update this product' });
        return res.send({ message: 'Product updated' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const product = await Product.findOne({ _id: productID });
        if (!product) return res.status(404).send({ message: 'Product not found' });
        const deleteC = await Product.findOneAndDelete({ _id: productID });
        if (!deleteC) return res.status(500).send({ message: 'Cannot delete this product' });
        return res.send({ message: 'Product deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.buyProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const params = req.body;
        if (!params.quantity) return res.status(400).send({ message: 'Invalid Quantity' });
        if (params.quantity < 0) return res.status(400).send({ message: 'Invalid Quantity' });
        const product = await Product.findOne({ _id: productId });
        if (!product) return res.status(404).send({ message: 'Product not found' });
        if (product.stock < params.quantity) return res.status(400).send({ message: 'Insufucient stock' });
        let stockT = product.stock - params.quantity;
        const payload = {
            client: req.user.sub,
            product: productId,
            quantity: params.quantity,
            date: new Date()
        }
        if (!payload.client || !payload.product || !payload.date || !payload.quantity) return res.status(500).send({ message: 'Cannot buy this product' });
        const reportExist = await Report.findOne({ client: payload.client, product: payload.product })
        const update = await Product.findByIdAndUpdate({ _id: productId }, { stock: stockT }, { new: true });
        if (!update) return res.status(500).send({ message: 'Cannot buy this product' });
        if (reportExist) {
            let totalQuantity = parseInt(reportExist.quantity) + parseInt(payload.quantity)
            const updateReport = await Report.findByIdAndUpdate({ _id: reportExist._id }, { quantity: totalQuantity });
            if (!updateReport) return res.status(500).send({ message: 'Cannot update this report' });
        } else {
            const report = new Report(payload);
            if (!report) return res.status(500).send({ message: 'Cannot create this report' });
            await report.save();
        }
        return res.send({ message: "Buy successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}