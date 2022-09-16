const express = require("express");
const Product = require("../models/ProductModel");
const router = express.Router();
const mongoose = require("mongoose");

const verifyToken = require("../middlewares/verifyToken");

router.post("/product", verifyToken, async (req, res) => {
  const data = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    category: req.body.categoryId,
    quantity: req.body.quantity,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    review: req.body.review,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/product", async (req, res) => {
  Product.find()
    .populate("category")
    .exec()
    .then((products) => {
      res.status(200).json({
        count: products.length,
        product: {
          products,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/product/:id", async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/product/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(
      id,
      updatedData,
      options
    ).populate("category");

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
