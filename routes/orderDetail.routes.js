const express = require('express');
const OrderDetailModel = require('../models/OrderDetailModel');
const router = express.Router();

router.post('/order-detail/post', async (req, res) => {
  const data = new OrderDetailModel({
    name: req.body.name,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/order-detail/getAll', async (req, res) => {
  try {
    const data = await OrderDetailModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/order-detail/getOne/:id', async (req, res) => {
  try {
    const data = await OrderDetailModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/order-detail/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await OrderDetailModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/order-detail/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderDetailModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
