const express = require("express");

const router = express.Router();

const Product =
  require("../models/Product");


// =========================================
// GET ALL PRODUCTS
// =========================================

router.get("/", async (req, res) => {

  try {

    const products =
      await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// =========================================
// GET PRODUCT BY ID
// =========================================

router.get("/id/:id", async (req, res) => {

  try {

    const product =
      await Product.findById(
        req.params.id
      );

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


// =========================================
// GET PRODUCT BY NAME
// =========================================

router.get(
  "/name/:name",
  async (req, res) => {

    try {

      const product =
        await Product.findOne({

          name: {
            $regex:
              req.params.name,

            $options: "i",
          },

        });

      res.json(product);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  }
);


// =========================================
// ADD PRODUCT
// =========================================

router.post("/", async (req, res) => {

  try {

    console.log(req.body);

    const newProduct =
      new Product(req.body);

    await newProduct.save();

    res.status(201).json({

      success: true,

      message:
        "Product Added",

      data: newProduct,

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


// =========================================
// UPDATE PRODUCT
// =========================================

router.patch("/:id", async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.json({

      success: true,

      message:
        "Product Updated",

      data: updatedProduct,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

});


// =========================================
// DELETE PRODUCT
// =========================================

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({

      success: true,

      message:
        "Product Deleted",

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