const express = require("express");
const Payment = require("../models/PaymentModel");
const router = express.Router();
const mongoose = require("mongoose");

const verifyToken = require("../middlewares/verifyToken");

router.post("/payment", verifyToken, async (req, res) => {
  const data = new Payment({
    _id: new mongoose.Types.ObjectId(),
    paymentType: req.body.paymentType,
    paymentStatus: req.body.paymentStatus,
    paymentDate: req.body.paymentDate,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/payment", async (req, res) => {
  try {
    const data = await Payment.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/payment/:id", async (req, res) => {
  try {
    const data = await Payment.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/payment/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Payment.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/payment/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Payment.findByIdAndDelete(id);
    res.send(`Document with ${data.paymentType} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
