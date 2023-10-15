// Sample object representing user access
var validez_usuario = {
  paciente: 0,
  profesionalMed: 0,
  logistica: 0,
};

// Function to show buttons based on the object values
function showButtons() {
  if (validez_usuario.paciente === 1) {
    document.getElementById("pacienteButton").style.display = "inline-block";
  }
  if (validez_usuario.profesionalMed === 1) {
    document.getElementById("medicoButton").style.display = "inline-block";
  }
  if (validez_usuario.logistica === 1) {
    document.getElementById("logisticaButton").style.display = "inline-block";
  }
}

// Call the function to display buttons
showButtons();
