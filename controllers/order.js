const express = require("express");
const { Order } = require("../models/OrderModel");
const router = express.Router();
const mongoose = require("mongoose");

exports.createOrder = async (req, res) => {
  const data = new Order({
    _id: new mongoose.Types.ObjectId(),
    products: req.body.products,
    amount: req.body.amount,
    user: req.body.user,
    address: req.body.address,
    total: req.body.total,
    status: req.body.status,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  const dateFrom = req.query.dateFrom
  const dateTo = req.query.dateTo
  console.log(typeof dateFrom, dateTo)

  try {
    if(dateFrom && dateTo){
      console.log(1)
      const data = await Order.aggregate([
        {
           $match: { createdAt: { $gte: new Date(dateFrom), $lt: new Date(dateTo) } }
        }
      ])
      res.json(data)
    }else{
      console.log(2)
      const data = await Order.find().populate("user").exec()
      res.json(data)
    }
  }catch(error){
    res.status(500).json({ message: error.message })
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const data = await Order.findById(req.params.orderId)
      .populate("user");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.orderId;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Order.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.orderId;
    const data = await Order.findByIdAndDelete(id);
    res.json(data)

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getIncome = async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth()-1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

  console.log('==', previousMonth, lastMonth)

  try{
    const income = await Order.aggregate([
      {
        $match: { createdAt: {$gte: previousMonth} }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
          amount: "$amount",
        },
      },
        {
          $group: {
            _id: "$month",
            totalAvenue: {$sum: "$sales" },
            total: { $sum: "$amount" }
          },
        },
    ])
    res.status(200).json(income)
  }catch(err){
    res.status(500).json(err)
  }
}

exports.filterOrder = async (req, res) => {
  const date = new Date()

  const dateFrom = new Date(req.params.dateFrom) 
  const dateTo = new Date(req.params.dateTo)

  console.log('==', dateFrom, dateTo)
  try{
    const income = await Order.aggregate([
      {
        $match: { createdAt: {$gte: dateFrom, $lt: dateTo } }
      },
    ])
    console.log(income)
    res.status(200).json(income)
  }catch(err){
    res.status(500).json(err)
  }
}





















