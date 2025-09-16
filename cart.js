/* ===================================
   IRON WILL - CARRITO DE COMPRAS (con stock)
   =================================== */

const CART_KEY = "ironwill_cart";
const PRODUCTS_KEY = "ironwill_productos";

/* ==========================
   FUNCIONES DE INVENTARIO
   ========================== */

// Obtener inventario
function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]");
}

// Guardar inventario
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/* ==========================
   FUNCIONES DE CARRITO
   ========================== */

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Agregar producto al carrito y reducir stock
function addToCart(productId) {
  let productos = getProducts();
  let producto = productos.find(p => p.id == productId);

  if (!producto) {
    console.error("Producto no encontrado:", productId);
    return;
  }

  // ⚡ Verificar stock
  if (producto.stock <= 0) {
    alert("⚠️ No hay stock disponible de " + producto.nombre);
    return;
  }

  // Reducir stock
  producto.stock -= 1;
  productos = productos.map(p => (p.id == productId ? producto : p));
  saveProducts(productos);

  // Agregar al carrito
  let carrito = getCart();
  const existente = carrito.find(p => p.id == producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  saveCart(carrito);
  actualizarContadorCarrito();
  mostrarMiniCarrito();
  actualizarProductosUI?.(); // si existe, refresca lista en tienda

  showToast(`${producto.nombre} agregado al carrito 🛒`);

}

// Eliminar producto del carrito y devolver stock
function removeFromCart(index) {
  let carrito = getCart();
  let productos = getProducts();

  if (carrito[index]) {
    const item = carrito[index];
    // devolver stock
    const prod = productos.find(p => p.id == item.id);
    if (prod) {
      prod.stock += item.cantidad;
      productos = productos.map(p => (p.id == prod.id ? prod : p));
      saveProducts(productos);
    }
  }

  carrito.splice(index, 1);
  saveCart(carrito);
  actualizarContadorCarrito();
  mostrarMiniCarrito();
  actualizarProductosUI?.();
}

// Vaciar carrito y devolver stock a inventario
function clearCart() {
  let carrito = getCart();
  let productos = getProducts();

  carrito.forEach(item => {
    const prod = productos.find(p => p.id == item.id);
    if (prod) {
      prod.stock += item.cantidad;
    }
  });

  saveProducts(productos);
  localStorage.removeItem(CART_KEY);

  actualizarContadorCarrito();
  mostrarMiniCarrito();
  actualizarProductosUI?.();
}

/* ==========================
   UI - CONTADOR Y MINI CARRITO
   ========================== */

function actualizarContadorCarrito() {
  const carrito = getCart();
  const countElem = document.getElementById("cart-count");
  if (countElem) {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    countElem.textContent = totalItems;
  }
}

function mostrarMiniCarrito() {
  const miniCart = document.getElementById("mini-cart");
  if (!miniCart) return;

  const itemsContainer = document.getElementById("mini-cart-items");
  const totalElem = document.getElementById("mini-cart-total");
  const carrito = getCart();

  if (carrito.length === 0) {
    itemsContainer.innerHTML = "<p>Carrito vacío.</p>";
    totalElem.textContent = "Total: $0";
    return;
  }

  itemsContainer.innerHTML = carrito
    .map(
      (item, i) => `
        <div class="mini-cart-item">
          <span>${item.nombre} x${item.cantidad}</span>
          <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
          <button class="remove-mini" onclick="removeFromCart(${i})">✖</button>
        </div>
      `
    )
    .join("");

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  totalElem.textContent = `Total: $${total.toLocaleString()}`;
}

/* ==========================
   EVENTOS
   ========================== */

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  mostrarMiniCarrito();
});

/* ==========================
   NOTIFICACIONES (Toast)
   ========================== */
function showToast(mensaje, tipo = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  toast.textContent = mensaje;

  document.body.appendChild(toast);

  // Animación de entrada
  setTimeout(() => toast.classList.add("show"), 50);

  // Desaparecer a los 3s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
