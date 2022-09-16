const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyToken = require("../middlewares/verifyToken");

router.post("/user", verifyToken, async (req, res) => {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const data = await User.findById(req.params.userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/user/:userId", verifyToken, async (req, res) => {
  try {
    const id = req.params.userId;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/user/:userId", verifyToken, async (req, res) => {
  try {
    const id = req.params.userId;
    const data = await User.findByIdAndDelete(id);
    res.send(`Document with ${data.userName} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    userName: req.body.userName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    role: req.body.role,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400,
    });

    res.status(200).send({
      user: _.omit(user.toJSON(), "password"),
      token,
    });
  });
});

router.post("/forgot-password", async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: "User not found." });
    }

    const randomPassword = "random";

    const newPassword = bcrypt.hashSync(randomPassword, 10);
    user.password = newPassword;
    res.status(200).json(user.save());
  });
});

router.post("/change-password/:id", async (req, res) => {
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
    const id = req.params.id;

    const result = await User.findByIdAndUpdate(id, {
      password: newPassword,
    });
    result.password = newPassword;

    res.status(200).json(result.save());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
