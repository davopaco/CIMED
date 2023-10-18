const btnSignIn = document.getElementById("sign-in"),
  btnSignUp = document.getElementById("sign-up"),
  btnSignUp2 = document.getElementById("sign-up2"),
  btnSignIn2 = document.getElementById("sign-in2"),
  formInicio = document.querySelector(".inicio"),
  loginForm = document.getElementById("loginForm"),
  registerForm = document.getElementById("registration-form"),
  formRegistro = document.querySelector(".registro"),
  formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", (e) => {
  formInicio.classList.add("hide");
  formLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", (e) => {
  formLogin.classList.add("hide");
  formRegistro.classList.remove("hide1");
});

btnSignIn2.addEventListener("click", (e) => {
  formInicio.classList.add("hide");
  formRegistro.classList.remove("hide1");
});

//funcion para imagen logo en login redirija a pagina principal
function redirectInit() {
  location.href = "/";
}

function redirectCrearHistorial() {
  window.location.href = `/historial/agregar?id=${id}`;
}

function redirectAlianza_Doctor() {
  location.href = "Alianza_consulta_Doctor.html";
}

function redirectModif_Datos_Usuario() {
  window.location.href = `/medico/modificar?id=${id}`;
}

function redirectLogout() {
  location.href = "/logout";
}
function redirectConsultarInv() {
  window.location.href = `/inventario?id=${id}`;
}

function redirectHistorialVer() {
  window.location.href = "";
}

function redirectHistorialMod() {
  window.location.href = `/historial/modificar?id=${id}`;
}
