const express = require("express");
const OrderDetail = require("../models/OrderDetailModel");
const router = express.Router();
const mongoose = require("mongoose");

const verifyToken = require("../middlewares/verifyToken");

router.post("/order-detail", verifyToken, async (req, res) => {
  const data = new OrderDetail({
    _id: new mongoose.Types.ObjectId(),
    orderId: req.body.orderId,
    productId: req.body.productId,
    price: req.body.price,
    quantity: req.body.quantity,
    total: req.body.total,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/order-detail", async (req, res) => {
  OrderDetail.find()
    .populate("orderId")
    .populate("productId")
    .exec()
    .then((details) => {
      res.status(200).json({
        count: details.length,
        details: {
          details,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/order-detail/:id", async (req, res) => {
  try {
    const data = await OrderDetail.findById(req.params.id)
      .populate("orderId")
      .populate("productId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/order-detail/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await OrderDetail.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/order-detail/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await OrderDetail.findByIdAndDelete(id);
    res.send(`Document with ${data.orderId} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
