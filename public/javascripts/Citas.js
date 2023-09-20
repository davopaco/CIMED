
const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      btnSignUp2 = document.getElementById("sign-up2"),
      btnSignIn2 = document.getElementById("sign-in2"),
      formInicio = document.querySelector(".inicio"),
      formRegistro = document.querySelector(".registro"),
      formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    formInicio.classList.add("hide")
    formLogin.classList.remove("hide")
});

btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide")
    formRegistro.classList.remove("hide1")
});

btnSignIn2 .addEventListener("click", e => {
    formInicio.classList.add("hide")
    formRegistro.classList.remove("hide1")
});


//funcion para imagen logo en login redirija a pagina principal
function redirectInit(){
    location.href = "index.html";
}

