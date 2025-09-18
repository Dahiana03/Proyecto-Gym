// ===============================
// Productos base
// ===============================
window.productos = [
  {
    id: 1,
    nombre: "Proteína Whey",
    precio: 120000,
    descripcion: "Proteína en polvo para ganar masa muscular",
    imagen: "img/proteina.jpg",
    stock: 10
  },
  {
    id: 2,
    nombre: "Creatina",
    precio: 80000,
    descripcion: "Mejora el rendimiento físico",
    imagen: "img/creatina.jpg",
    stock: 5
  },
  {
    id: 3,
    nombre: "Guantes de gimnasio",
    precio: 40000,
    descripcion: "Protección y agarre para tus entrenamientos",
    imagen: "img/guantes.jpg",
    stock: 15
  }
];


// ===============================
// Funciones de gestión
// ===============================

// Obtener productos extras agregados manualmente
function getExtraProducts() {
  return JSON.parse(localStorage.getItem("ironwill_productos_extra") || "[]");
}

// Guardar extras en localStorage
function saveExtraProducts(extras) {
  localStorage.setItem("ironwill_productos_extra", JSON.stringify(extras));
}

// Combinar base + extras
function getAllProducts() {
  const base = window.productos || [];
  const extra = getExtraProducts();
  return [...base, ...extra];
}

// Agregar un nuevo producto (desde agregar.html)
function addProduct(producto) {
  const extras = getExtraProducts();
  const newId = Date.now(); // id único
  extras.push({ id: newId, ...producto });
  saveExtraProducts(extras);
}

// Inicializar productos en localStorage (para tienda)
function initProducts() {
  const all = getAllProducts();
  localStorage.setItem("ironwill_productos", JSON.stringify(all));
  return all;
}

// 👉 Mostrar vista previa de la imagen
document.getElementById("imagen").addEventListener("input", function() {
  const preview = document.getElementById("preview");
  if (this.value.trim() !== "") {
    preview.src = this.value;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
    preview.src = "";
  }
});
