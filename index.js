const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(err);
  });

// HOME
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ROUTES
app.use("/users", userRoutes);

app.use("/products", productRoutes);

app.use("/orders", orderRoutes);

// SERVER
const PORT =
  process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});