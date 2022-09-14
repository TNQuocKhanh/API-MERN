const express = require('express');
const router = express.Router();

const Category = require('../models/CategoryModel');

router.get('/category', async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/category', async (req, res) => {
  const data = new Category({
    name: req.body.name,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/category/:categoryId', async (req, res) => {
  try {
    const data = await Category.findById(req.params.categoryId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/category/:categoryId', async (req, res) => {
  try {
    const id = req.params.categoryId;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Category.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/category/:categoryId', async (req, res) => {
  try {
    const id = req.params.categoryId;
    const data = await Category.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
