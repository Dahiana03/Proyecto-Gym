window.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("user-info");
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    userInfo.innerHTML = `
      Bienvenido, <strong>${usuario}</strong> 
      <button id="logout-btn" style="margin-left:10px; padding:5px 10px; border:none; border-radius:5px; background:red; color:white; cursor:pointer;">Cerrar sesión</button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("usuario");
      window.location.href = "login.html";
    });
  } else {
    userInfo.innerHTML = `<a href="login.html">Iniciar sesión</a>`;
  }
});