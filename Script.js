
const productList = document.getElementById("product-list");

let products = JSON.parse(localStorage.getItem("products")) || [];


function generateProductCards() {
  productList.innerHTML = "";

 
  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productName = document.createElement("h3");
    productName.classList.add("product-name");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = "Price: $" + product.price.toFixed(2);

    const productDescription = document.createElement("p");
    productDescription.classList.add("product-description");
    productDescription.textContent = product.description;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteProduct(index);
    });

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDescription);
    productCard.appendChild(deleteButton);

    productList.appendChild(productCard);
  });
}

// Function to add a new product
function addProduct(name, price, description) {
  const newProduct = {
    name,
    price: parseFloat(price),
    description,
  };

  products.push(newProduct);
  saveProductsToLocalStorage();
  generateProductCards();
}


function deleteProduct(index) {
  products.splice(index, 1);
  saveProductsToLocalStorage();
  generateProductCards();
}

function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Handle form submission
document.getElementById("product-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const descriptionInput = document.getElementById("description");

  addProduct(nameInput.value, priceInput.value, descriptionInput.value);

  nameInput.value = "";
  priceInput.value = "";
  descriptionInput.value = "";
});


generateProductCards();
