const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

// GET ALL USERS
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

// REGISTER
router.post("/register", async (req, res) => {

try {

 
const { name, email, password } = req.body;

const existingUser =
  await User.findOne({
    email,
  });

if (existingUser) {

  return res.status(400).json({
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
});

await user.save();

res.status(201).json({
  message:
    "User Registered",
});
 

} catch (error) {

 
res.status(500).json({
  message:
    error.message,
});
 

}

});

// LOGIN
router.post("/login", async (req, res) => {

try {

 
const { email, password } =
  req.body;

const user =
  await User.findOne({
    email,
  });

if (!user) {

  return res.status(404).json({
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
    message:
      "Invalid Password",
  });

}

const token =
  jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET ||
      "secretkey",
    {
      expiresIn: "7d",
    }
  );

res.json({
  message:
    "Login Successful",
  token,
  user,
});
 

} catch (error) {

 
res.status(500).json({
  message:
    error.message,
});
 

}

});

module.exports = router;
