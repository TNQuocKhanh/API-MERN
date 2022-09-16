const express = require("express");
const Order = require("../models/OrderModel");
const router = express.Router();
const mongoose = require("mongoose");

const verifyToken = require("../middlewares/verifyToken");

router.post("/order", verifyToken, async (req, res) => {
  const data = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    paymentId: req.body.paymentId,
    orderDate: req.body.orderDate,
    info: req.body.info,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/order", async (req, res) => {
  Order.find()
    .populate("userId")
    .populate("paymentId")
    .exec()
    .then((orders) => {
      console.log("==order", orders);
      res.status(200).json({
        count: orders.length,
        order: {
          orders,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/order/:id", async (req, res) => {
  try {
    const data = await Order.findById(req.params.id)
      .populate("paymentId")
      .populate("userId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/order/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Order.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/order/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Order.findByIdAndDelete(id);
    res.send(`Document with ${data.userId} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
