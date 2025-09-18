/* ===================================
   IRON WILL - AUTENTICACIÓN DE USUARIOS
   =================================== */

let currentUser = null;

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  checkSession();
  setupLoginForm();
  setupRegisterForm();
});

// Revisar si hay sesión activa
function checkSession() {
  const savedUser = localStorage.getItem("ironwill_user");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showWelcomeMessage(currentUser.name);
  }
}

// Configurar login
function setupLoginForm() {
  const loginForm = document.querySelector(".login-form");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if (!GymUtils.Validation.isValidEmail(email)) {
      showMessage("Correo inválido ❌", "error");
      return;
    }
    if (password.length < 6) {
      showMessage("Contraseña muy corta ❌", "error");
      return;
    }

    const users = JSON.parse(localStorage.getItem("ironwill_users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      currentUser = user;
      localStorage.setItem("ironwill_user", JSON.stringify(user));
      showWelcomeMessage(user.name);
      showMessage("Sesión iniciada ✅", "success");
    } else {
      showMessage("Usuario o contraseña incorrectos ❌", "error");
    }
  });
}

// Configurar registro
function setupRegisterForm() {
  const registerLink = document.querySelector(".register-link");
  if (!registerLink) return;

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();

    const name = prompt("Tu nombre completo:");
    const email = prompt("Tu correo electrónico:");
    const password = prompt("Crea una contraseña (mínimo 6 caracteres):");

    if (!name || !GymUtils.Validation.isNotEmpty(name)) {
      alert("Nombre inválido");
      return;
    }
    if (!GymUtils.Validation.isValidEmail(email)) {
      alert("Correo inválido");
      return;
    }
    if (!password || password.length < 6) {
      alert("Contraseña muy corta");
      return;
    }

    let users = JSON.parse(localStorage.getItem("ironwill_users") || "[]");
    if (users.some(u => u.email === email)) {
      alert("Ya existe un usuario con ese correo");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("ironwill_users", JSON.stringify(users));
    alert("Registro exitoso ✅, ahora puedes iniciar sesión");
  });
}

// Mostrar mensaje de bienvenida
function showWelcomeMessage(name) {
  const loginSection = document.querySelector("#login");
  if (loginSection) {
    loginSection.innerHTML = `
      <h2>Bienvenido, ${name} 👋</h2>
      <button class="btn-secondary" onclick="logout()">Cerrar Sesión</button>
    `;
  }
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("ironwill_user");
  currentUser = null;
  location.reload();
}

// Mensajes flotantes
function showMessage(message, type = "info") {
  const msg = document.createElement("div");
  msg.className = `auth-message ${type}`;
  msg.textContent = message;
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}


//iniciar sesion
document.querySelector(".login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  // ⚡ Aquí deberías validar el usuario (por simplicidad aceptamos cualquier cosa)
  if(username && password) {
    localStorage.setItem("usuario", username);
    window.location.href = "index.html"; // redirigir al inicio
  } else {
    alert("Por favor ingresa usuario y contraseña");
  }
});

