const express = require('express');
const PaymentModel = require('../models/PaymentModel');
const router = express.Router();

router.post('/payment/post', async (req, res) => {
  const data = new PaymentModel({
    name: req.body.name,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/payment/getAll', async (req, res) => {
  try {
    const data = await PaymentModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/payment/getOne/:id', async (req, res) => {
  try {
    const data = await PaymentModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/payment/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await PaymentModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/payment/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PaymentModel.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
