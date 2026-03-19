const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Serve frontend (public folder)
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection (Render + Atlas)
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Product Schema
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  images: [String],
  category: String,
  description: String
});

// ================= ROUTES =================

// ➕ Add Product
app.post("/add-product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (err) {
    res.status(500).send("Error adding product");
  }
});

// 📦 Get All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

// 🔍 Get Single Product
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
});

// ❌ Delete Product (FOR ADMIN PANEL)
app.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
});

// ✏️ Update Product (OPTIONAL)
app.put("/update/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
  } catch (err) {
    res.status(500).send("Error updating product");
  }
});

// ✅ Fix homepage (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});