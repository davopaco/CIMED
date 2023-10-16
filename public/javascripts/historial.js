const genRec = document.getElementById("gen-rec-med"),
  btnHistorial = document.getElementById("gen-hist"),
  formulario = document.getElementById("form_receta");

genRec.addEventListener("click", (e) => {
  if (formulario.style.display == "none") {
    formulario.style.display = "block";
  } else {
    formulario.style.display = "none";
  }
});

btnHistorial.addEventListener("click", async (e) => {
  console.log("El historial se está generando.");
  var receta_med_bool = false;
  if (formulario.style.display == "block") {
    receta_med_bool = true;
  }
  e.preventDefault();
  var formElement = document.getElementById("consulta-medica");
  var formElement2 = document.getElementById("antecedentes");
  var formElement3 = document.getElementById("receta-medica");
  var formElement4 = document.getElementById("cita-form");
  const formData = new FormData(formElement);
  const formData2 = new FormData(formElement2);
  var formData3;
  const formData4 = new FormData(formElement4);
  if (receta_med_bool) {
    formData3 = new FormData(formElement3);
  }
  const formDataObject = {};
  formDataObject["receta_medica"] = receta_med_bool;
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  formData2.forEach((value, key) => {
    formDataObject[key] = value;
  });

  if (receta_med_bool) {
    formData3.forEach((value, key) => {
      formDataObject[key] = value;
    });
  }

  formData4.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const jsonData = JSON.stringify(formDataObject);
  console.log(jsonData);
  try {
    const response = await fetch(`/historial/agregar?id=${id}`, {
      method: "POST",
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      if (!alert("Historial creado correctamente!")) {
        window.location.href = `/medico/${id}?id=${id}`;
      }
    } else if (response.status === 401) {
      if (!alert("El historial no ha podido ser creado.")) {
        window.location.href = `/medico/${id}?id=${id}`;
      }
    } else {
      alert("Error: " + response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
