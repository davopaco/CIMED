modificarForm = document.getElementById("modificar-form");

modificarForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var formElement = document.getElementById("modificar-form");
  const formData = new FormData(formElement);
  console.log(formData);

  try {
    const response = await fetch(`/medico/modificar?id=${id}`, {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      if (!alert("Usuario modificado correctamente. Redireccionando...")) {
        window.location.href = `/medico/${id}?id=${id}`;
      }
    } else if (response.status === 401) {
      if (!alert("Ocurrió un error al modificar sus datos.")) {
        window.location.href = `/medico/${id}?id=${id}`;
      }
    } else {
      if (!alert("Error" + response.status)) {
        window.location.href = `/medico/${id}?id=${id}`;
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
