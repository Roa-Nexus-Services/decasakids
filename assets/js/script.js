'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * add active class on header when scrolled 200px from top
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 200 ? header.classList.add("active")
    : header.classList.remove("active");
})

let totalPrice = 0; 
const maxProducts = 12;

function addToCart(button) {
  const product = button.closest('.product-card'); 
  const price = parseFloat(product.getAttribute('data-price')); 
  const imageSrc = product.querySelector('img').src; 

  const boxContent = document.getElementById("box-content");
  const cartBox = document.querySelector(".cart-box");
  const productCount = boxContent.childElementCount;

  if (productCount >= maxProducts) {
    cartBox.classList.add("full"); 
    alert("La caja está llena. No puedes agregar más productos.");
    return;
  }

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Producto";
  boxContent.appendChild(img);

  totalPrice += price;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);

  button.disabled = true;
  button.textContent = "Agregado";
}

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products-container-circulo");
  const selectedProduct = document.querySelector(".selected-product");
  const productImages = document.querySelectorAll(".productos_circulo img");

  let currentIndex = 0;

  const updateSelectedProduct = () => {
    const currentProduct = productImages[currentIndex];
    const { src, dataset } = currentProduct;

    // Actualizar producto seleccionado
    selectedProduct.querySelector("img").src = src;
    selectedProduct.querySelector("h3").textContent = dataset.name;
    selectedProduct.querySelector("p").textContent = dataset.price;
  };

  const rotateWheel = () => {
    const angle = (360 / productImages.length) * currentIndex;

    productsContainer.style.transform = `rotate(-${angle}deg)`;

    updateSelectedProduct();
    currentIndex = (currentIndex + 1) % productImages.length;
  };

  setInterval(rotateWheel, 3000);

  updateSelectedProduct();
});