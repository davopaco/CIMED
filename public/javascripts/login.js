const btnSignIn = document.getElementById("sign-in"),
  btnSignUp = document.getElementById("sign-up"),
  btnSignUp2 = document.getElementById("sign-up2"),
  btnSignIn2 = document.getElementById("sign-in2"),
  formInicio = document.querySelector(".inicio"),
  loginForm = document.getElementById("loginForm");
(formRegistro = document.querySelector(".registro")),
  (formLogin = document.querySelector(".login"));

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

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var formElement = document.getElementById("loginForm");
  const formData = new FormData(formElement);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const jsonData = JSON.stringify(formDataObject);
  console.log(jsonData);
  try {
    const response = await fetch("/login", {
      method: "POST",
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log("Usuario encontrado y autenticado exitosamente.");
      whereTo(data);
    } else if (response.status === 401) {
      alert("La contraseña es incorrecta.");
    } else if (response.status === 404) {
      alert("El usuario no existe.");
    } else if (response.status === 409) {
      alert(
        "El usuario ya se encuentra autenticado. Si no eres tú, por favor contacta a la administración de CIMED."
      );
    } else {
      console.error("Error: " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

//funcion para imagen logo en login redirija a pagina principal
function redirectInit() {
  location.href = "/";
}

function redirectModif_Datos_Usuario() {
  location.href = "Formulario_Login.html";
}
function redirectAlianza_Doctor() {
  location.href = "Alianza_consulta_Doctor.html";
}

function whereTo(dataSend) {
  if (dataSend.page === 1) {
    window.location.href = `/paciente/${dataSend.id}?id=${dataSend.id}`;
  } else if (dataSend.page === 2) {
    window.location.href = `/medico/${dataSend.id}`;
  } else if (dataSend.page === 3) {
    window.location.href = `/logistica/${dataSend.id}`;
  } else {
    window.location.href = `/cambioUsuario/id=${dataSend.id}page=${dataSend.page}`;
  }
}
