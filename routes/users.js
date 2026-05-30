const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

// GET USERS
router.get("/", async (req, res) => {

  try {

    const users =
      await User.find().select(
        "-password"
      );

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

// REGISTER
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user = new User({
        name,
        email,
        password:
          hashedPassword,
        role:
          email ===
          "admin@gmail.com"
            ? "admin"
            : "user",
        active: true,
      });

      await user.save();

      res.status(201).json({
        success: true,
        message:
          "User Registered",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  }
);

// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User Not Found",
        });

      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid Password",
        });

      }

      const token =
        jwt.sign(
          {
            id: user._id,
            email:
              user.email,
            role:
              user.role,
          },
          process.env
            .JWT_SECRET ||
            "secretkey",
          {
            expiresIn:
              "7d",
          }
        );

      res.json({
        success: true,
        message:
          "Login Successful",
        token,
        user: {
          id: user._id,
          name:
            user.name,
          email:
            user.email,
          role:
            user.role,
        },
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  }
);

// PROTECTED PROFILE
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select(
          "-password"
        );

      res.json({
        success: true,
        user,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  }
);

module.exports = router;