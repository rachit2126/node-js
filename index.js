const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();


// Middleware
app.use(cors(origin = "*"));

app.use(express.json());


// MongoDB Connection
mongoose.connect(
  "mongodb+srv://rachit:1agGyt3mJA3RUHLr@cluster0.m3c0as6.mongodb.net/mydb",
  {
    family: 4,
  }
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});


app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Routes
app.use("/users", userRoutes);

app.use("/products", productRoutes);

app.use("/orders", orderRoutes);


// Home Route



// Server
app.listen(3002, () => {
  console.log("Server Running on port 3002");
});