const express = require('express');
const OrderModel = require('../models/OrderModel');
const router = express.Router();

router.post('/order/post', async (req, res) => {
  const data = new OrderModel({
    name: req.body.name,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/order/getAll', async (req, res) => {
  try {
    const data = await OrderModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/order/getOne/:id', async (req, res) => {
  try {
    const data = await OrderModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/order/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await OrderModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/order/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
