const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // serve frontend

// ✅ Connect MongoDB Atlas (from Render env variable)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

// ❌ Delete Product (for future use)
app.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product Deleted");
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
});

// ✏️ Update Product (optional upgrade)
app.put("/update/:id", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Product Updated");
  } catch (err) {
    res.status(500).send("Error updating product");
  }
});

// ================= START SERVER =================

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});