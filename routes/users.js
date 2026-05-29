const express = require("express");
const bcrypt = require("bcryptjs");

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

// ================= REGISTER =================

router.post("/register", async (req, res) => {

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
  user,
});
 

} catch (error) {

 
console.log(error);

res.status(500).json({
  success: false,
  message:
    error.message,
});
 

}

});

// ================= LOGIN =================

router.post("/login", async (req, res) => {

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

res.json({
  success: true,
  message:
    "Login Successful",
  user,
});
 

} catch (error) {

 
res.status(500).json({
  success: false,
  message:
    error.message,
});
 

}

});

module.exports = router;
