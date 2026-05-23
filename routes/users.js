const express = require("express");

const router = express.Router();

const User = require("../models/User");


// ================= GET USERS =================
router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ================= GET SINGLE USER =================
router.get("/:id", async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// ================= ADD USER =================
router.post("/", async (req, res) => {

  try {

    const newUser = new User(req.body);

    await newUser.save();

    res.json({
      success: true,
      message: "User Added",
      data: newUser,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// ================= UPDATE USER =================
router.patch("/:id", async (req, res) => {

  try {

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json({
      success: true,
      message: "User Updated",
      data: updatedUser,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


// ================= DELETE USER =================
router.delete("/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "User Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});


module.exports = router;