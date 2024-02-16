const express = require("express");
const fs = require("fs").promises;
const app = express();
const { ProductManager, productData } = require("./index.js");

// Create instance of ProductManager and create list of products
const productList = new ProductManager();
productList.readFile();
productData.forEach((data) => {
  productList.addProduct(...data);
});

// Paths
app.get("/products", async (req, res) => {
  try {
    const data = await productList.readFile();
    let limit = req.query.limit;

    if (limit) {
      const limitData = data.slice(0, limit);
      res.send(limitData);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log("Couldn´t get product list");
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const data = await productList.readFile();
    let productId = req.params.pid;

    const findProduct = data.find((item) => item.id == productId);

    if (findProduct) {
      res.send(findProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8080, () => {
  console.log(`listening on port 8080`);
});
