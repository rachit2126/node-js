 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(
 " mongodb+srv://rachit:1agGyt3mJA3RUHLr@cluster0.m3c0as6.mongodb.net/mydb"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(
      "MongoDB Error:",
      err
    );
  });

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const PORT =
  process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});