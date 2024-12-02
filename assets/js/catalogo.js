'use strict';

/** ===============================
 * NAVBAR TOGGLE FUNCTIONALITY
 * =============================== */
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElements = [overlay, navOpenBtn, navCloseBtn];

// Toggle navbar and overlay
navElements.forEach(element => {
  element.addEventListener("click", () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
});

/** ===============================
 * HEADER SCROLL EFFECT
 * =============================== */
const header = document.querySelector("[data-header]");

// Add active class to header on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY >= 200) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/** ===============================
 * CART FUNCTIONALITY
 * =============================== */
let totalPrice = 0;
const maxProducts = 4;

function addToCart(button) {
  const product = button.closest('.product-card'); // Parent product element
  const price = parseFloat(product.getAttribute('data-price')); // Product price
  const imageSrc = product.querySelector('img').src; // Product image source

  const boxContent = document.getElementById("box-content");
  const cartBox = document.querySelector(".cart-box");
  const productCount = boxContent.childElementCount;

  // Check if cart is full
  if (productCount >= maxProducts) {
    cartBox.classList.add("full");
    alert("La caja está llena. No puedes agregar más productos.");
    return;
  }

  // Add product image to cart
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Producto";
  boxContent.appendChild(img);

  totalPrice += price;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);

  button.disabled = true;
  button.textContent = "Agregado";
}

/** ===============================
 * SECTION TOGGLE FUNCTIONALITY
 * =============================== */
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const filteredContainer = document.getElementById("filtered-container");
  const allSections = document.querySelectorAll(".container_sub");
  const allProductCards = document.querySelectorAll(".product-card"); 
  const toggleButtons = document.querySelectorAll(".filter-btn");

  // Restaurar la vista normal de secciones
  const restoreSections = () => {
    filteredContainer.style.display = "none"; // Ocultar contenedor filtrado
    filteredContainer.innerHTML = ""; // Limpiar contenedor filtrado

    // Mostrar todas las secciones y reiniciar botones
    allSections.forEach(section => section.style.display = "block");
    toggleButtons.forEach(button => {
      const targetSectionId = button.getAttribute("data-target");
      const targetSection = document.getElementById(targetSectionId);

      // Restaurar la visibilidad según la clase `visible`
      if (targetSection.classList.contains("visible")) {
        targetSection.style.display = "block";
      } else {
        targetSection.style.display = "none";
      }
    });
  };

  // Filtrar y mostrar productos en el contenedor filtrado
  const filterProducts = (searchTerm) => {
    const filteredProducts = [];
    const regex = new RegExp(searchTerm, "i"); // Insensible a mayúsculas/minúsculas

    // Iterar sobre todos los productos y buscar coincidencias
    allProductCards.forEach(card => {
      const cardTitleElement = card.querySelector(".card-title p");

      if (cardTitleElement) {
        const cardTitle = cardTitleElement.textContent.trim().toLowerCase();

        // Comparar con una expresión regular
        if (regex.test(cardTitle)) {
          filteredProducts.push(card.parentElement.outerHTML); // Guardar el producto
        }
      }
    });

    // Mostrar productos filtrados o mensaje si no hay resultados
    if (filteredProducts.length > 0) {
      filteredContainer.innerHTML = filteredProducts.join("");
    } else {
      filteredContainer.innerHTML = "<p>No se encontraron productos.</p>";
    }
    filteredContainer.style.display = "flex"; // Mostrar contenedor con estilo flex
    allSections.forEach(section => section.style.display = "none"); // Ocultar secciones
  };

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      restoreSections(); // Restaurar secciones originales si el buscador está vacío
    } else {
      filterProducts(searchTerm); // Filtrar productos según el término de búsqueda
    }
  });

  // Restaurar funcionalidad de botones de filtro
  toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetSectionId = button.getAttribute("data-target");

      allSections.forEach(section => {
        section.classList.remove("visible");
        section.style.display = "none";
      });
      toggleButtons.forEach(btn => btn.classList.remove("active"));

      const targetSection = document.getElementById(targetSectionId);
      targetSection.classList.add("visible");
      targetSection.style.display = "block";
      button.classList.add("active");
    });
  });
});
