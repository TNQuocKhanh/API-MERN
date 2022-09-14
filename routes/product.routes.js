const express = require('express');
const ProductModel = require('../models/ProductModel');
const router = express.Router();

router.post('/product/post', async (req, res) => {
  const data = new ProductModel({
    name: req.body.name,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/product/getAll', async (req, res) => {
  try {
    const data = await ProductModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/product/getOne/:id', async (req, res) => {
  try {
    const data = await ProductModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/product/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await ProductModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/product/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
