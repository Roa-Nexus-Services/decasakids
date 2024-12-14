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
const selectedProducts = []; // Para almacenar productos seleccionados

function addToCart(button) {
  const product = button.closest('.product-card'); // Elemento padre del producto
  const price = parseFloat(product.getAttribute('data-price')); // Precio del producto
  const name = product.getAttribute('data-name'); // Nombre del producto
  const imageSrc = product.querySelector('img').src; // Fuente de la imagen

  const boxContent = document.getElementById("box-content");
  const cartBox = document.querySelector(".cart-box");
  const productCount = boxContent.childElementCount;

  // Verifica si el carrito está lleno
  if (productCount >= maxProducts) {
    cartBox.classList.add("full");
    alert("La caja está llena. No puedes agregar más productos.");
    return;
  }

  // Añade la imagen del producto al carrito visual
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Producto";
  boxContent.appendChild(img);

  // Actualiza el precio total y añade el producto a la lista
  totalPrice += price;
  selectedProducts.push({ name, price });
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);

  // Desactiva el botón y cambia su texto
  button.disabled = true;
  button.textContent = "Agregado";
}

function sendToWhatsApp() {
  if (selectedProducts.length === 0) {
    alert("No hay productos en la caja para enviar.");
    return;
  }

  const phone = "18098999499"; // Número de WhatsApp en formato internacional
  let message = "Lista de compra:\n\n";

  // Construye la lista de productos con cantidades
  selectedProducts.forEach((product, index) => {
    const productCard = document.querySelector(`.product-card[data-name="${product.name}"]`);
    const quantitySpan = productCard.querySelector('.quantity'); // Obtén la cantidad actual
    const quantity = parseInt(quantitySpan.textContent) || 1; // Usa 1 como valor predeterminado

    message += `${index + 1}. ${product.name} - Cantidad: ${quantity} - $${(product.price * quantity).toFixed(2)}\n`;
  });

  message += `\nTotal: $${totalPrice.toFixed(2)}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.location.href = url; 
}


/** ===============================
 * QUANTITY CONTROL
 * =============================== */
function updateProductQuantity(button, change) {
  const productCard = button.closest('.product-card'); 
  const quantitySpan = productCard.querySelector('.quantity'); 
  const productPrice = parseFloat(productCard.getAttribute('data-price')); 

  let currentQuantity = parseInt(quantitySpan.textContent);
  currentQuantity += change;

  // Evita que la cantidad sea menor a 1
  if (currentQuantity < 1) {
    alert("La cantidad no puede ser menor a 1.");
    return;
  }

  // Actualiza la cantidad
  quantitySpan.textContent = currentQuantity;

  // Calcula el nuevo precio total
  const totalPriceElement = document.getElementById("total-price");
  totalPrice += productPrice * change;
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function resetQuantities() {
  // Opcional: Resetea todas las cantidades a 1 si es necesario
  const quantities = document.querySelectorAll('.quantity');
  quantities.forEach(quantity => quantity.textContent = "1");
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


// Crea y configura el modal al inicio
const modal = document.createElement('div');
modal.id = 'image-modal';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100vw';
modal.style.height = '100vh';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
modal.style.display = 'none';
modal.style.alignItems = 'center';
modal.style.justifyContent = 'center';
modal.style.zIndex = '1000';

// Contenedor de la imagen dentro del modal
const modalImage = document.createElement('img');
modalImage.style.maxWidth = '90%';
modalImage.style.maxHeight = '90%';

// Botón para cerrar el modal
const closeButton = document.createElement('button');
closeButton.textContent = 'X';
closeButton.style.position = 'absolute';
closeButton.style.top = '20px';
closeButton.style.right = '20px';
closeButton.style.backgroundColor = 'white';
closeButton.style.border = 'none';
closeButton.style.padding = '10px';
closeButton.style.cursor = 'pointer';

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Añade los elementos al modal
modal.appendChild(modalImage);
modal.appendChild(closeButton);
document.body.appendChild(modal);

// Función para mostrar el modal con la imagen del producto
function showImageModal(button) {
  const product = button.closest('.product-card'); // Encuentra la tarjeta del producto
  const image = product.querySelector('p > img'); // Selecciona la imagen dentro del <p>
  if (image) {
    modalImage.src = image.src; // Usa la fuente de la imagen seleccionada
    modal.style.display = 'flex'; // Muestra el modal
  } else {
    alert('Imagen no encontrada'); // Manejo de error si no hay imagen
  }
}

// Asigna la función a los botones de "Quick view"
document.querySelectorAll('.card-action-btn[aria-label="Quick view"]').forEach(button => {
  button.addEventListener('click', function () {
    showImageModal(this);
  });
});
