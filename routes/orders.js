const express = require("express");

const router = express.Router();

const Order =
  require("../models/Order");


// =========================================
// GET ALL ORDERS
// =========================================

router.get("/", async (req, res) => {

  try {

    const orders =
      await Order.find();

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// =========================================
// ADD ORDER
// =========================================

router.post("/", async (req, res) => {

  try {

    const newOrder =
      new Order(req.body);

    await newOrder.save();

    res.json({
      success: true,
      data: newOrder,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// =========================================
// UPDATE ORDER
// =========================================

router.patch("/:id", async (req, res) => {

  try {

    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json({
      success: true,
      data: updatedOrder,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// =========================================
// DELETE ORDER
// =========================================

router.delete("/:id", async (req, res) => {

  try {

    await Order.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


module.exports = router;