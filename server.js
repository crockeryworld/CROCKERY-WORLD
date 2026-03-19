const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  images: [String],
  category: String,
  description: String
});

// Routes
app.post("/add-product", async (req,res)=>{
  await Product.create(req.body);
  res.send("Added");
});

app.get("/products", async (req,res)=>{
  res.json(await Product.find());
});

app.get("/product/:id", async (req,res)=>{
  res.json(await Product.findById(req.params.id));
});

// ✅ FIX FOR HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ IMPORTANT FOR RENDER
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server running"));