// Function to show buttons based on the object values
const pacButton = document.getElementById("pacienteButton"),
  medButton = document.getElementById("medicoButton"),
  logButton = document.getElementById("logisticaButton");
function showButtons(page) {
  const validez = page;
  console.log(validez);

  if (validez % 2 != 0) {
    pacButton.style.display = "inline-block";
  }
  if (validez == 3 || validez == 6 || validez == 7) {
    medButton.style.display = "inline-block";
  }
  if (validez == 5 || validez == 6 || validez == 7) {
    logButton.style.display = "inline-block";
  }
}

pacButton.addEventListener("click", (e) => {
  window.location.href = `/paciente/${id}?id=${id}`;
});

medButton.addEventListener("click", (e) => {
  window.location.href = `/medico/${id}?id=${id}`;
});

logButton.addEventListener("click", (e) => {
  window.location.href = `/logistica/${id}?id=${id}`;
});

function redirectLogout() {
  location.href = "/logout";
}

console.log(page);
showButtons(page);
