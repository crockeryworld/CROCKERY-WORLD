let allProducts = [];

// 🚀 Load all products
async function loadProducts() {
  try {
    let res = await fetch("/products");
    let data = await res.json();
    allProducts = data;
    displayProducts(allProducts);
  } catch (err) {
    console.log("Error loading products", err);
  }
}

// 🎯 Display products
function displayProducts(products) {
  let html = "";

  products.forEach(p => {
    html += `
    <div class="card">
      <img src="${p.images[0]}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="viewProduct('${p._id}')">View</button>
    </div>`;
  });

  document.getElementById("products").innerHTML = html;
}

// 🔍 View product page
function viewProduct(id) {
  window.location = "product.html?id=" + id;
}

// 🔎 Simple search (optional)
function searchProducts() {
  let input = document.querySelector(".nav input").value.toLowerCase();

  let filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(input)
  );

  displayProducts(filtered);
}

// 🎯 Category filter (optional upgrade)
function filterCategory(category) {
  let filtered = allProducts.filter(p =>
    p.category.toLowerCase() === category.toLowerCase()
  );

  displayProducts(filtered);
}

// 🚀 Load on start
loadProducts();