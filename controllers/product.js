const express = require('express');
const Product = require('../models/ProductModel');
const router = express.Router();
const mongoose = require('mongoose');

exports.createProduct = async (req, res) => {
  const data = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
    photo: req.body.photo,
    sold: req.body.sold,
    shipping: req.body.shipping,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const name = req.query.search;
  try {
    if (name) {
      const data = await Product.find({
        name: new RegExp(name, 'i'),
      });
      res.json(data);
    } else {
      const data = await Product.find().populate('category').exec();
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.productId).populate(
      'category'
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(
      id,
      updatedData,
      options
    ).populate('category');

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const data = await Product.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
