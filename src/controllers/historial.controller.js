import { pool } from "../database.js";
import path from "path";
import { fileURLToPath } from "url";

export const agregarHistorial = async (req, res) => {
  const {
    fecha_form,
    pasado_med,
    sintomas,
    historial_familiar,
    historial_med,
    alergias,
    resultados,
    examen_fis,
    codigo_medicamento,
    receta_med_bool,
  } = req.body;
  const id_cita = req.query.id_cita;

  const [rows1] = await pool.query(
    "SELECT id_medico, paciente_id FROM CITA WHERE ID = ?",
    [id_cita]
  );
  const id_medico = rows1[0].id_medico;
  const id_paciente = rows1[0].paciente_id;

  const [historiales] = await pool.query(
    "INSERT INTO HISTORIAL_CLINICO (FECHA_FORM, PASADO_MED, SINTOMAS, HISTORIAL_FAMILIAR, HISTORIAL_MEDICACION, ALERGIAS, RESULTADOS_LAB, EXAMEN_FIS, PACIENTE_ID, PROFESIONAL_SALUD_ID) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      fecha_form,
      pasado_med,
      sintomas,
      historial_familiar,
      historial_med,
      alergias,
      resultados,
      examen_fis,
      id_paciente,
      id_medico,
    ]
  );

  var recetas;
  if (receta_med_bool == true) {
    [recetas] = await pool.query(
      "INSERT INTO RECETA_MEDICA (ID, CODIGO_MEDICAMENTO, PROFESIONAL_SALUD_ID, HISTORIAL_CLINICO_ID, PACIENTE_ID) VALUES (?,?,?,?,?)",
      [fecha_form, pasado_med, sintomas, historial_clinico]
    );
  }

  if (historiales.affectedRows === 0)
    return res.status(404).json({ message: "Historial no agregado" });
  if (historiales.affectedRows > 0)
    return res.status(200).json({ message: "Historial agregado" });
};

export const getHistorial = async (req, res) => {
  const id_paciente = req.params.id_paciente;
  const [historiales] = await pool.query(
    "SELECT * FROM HISTORIAL_CLINICO WHERE ID = ?",
    [id_paciente]
  );
  const [recetas] = await pool.query(
    "SELECT * FROM RECETA_MEDICA WHERE ID = ?",
    [id_paciente]
  );
  res.render("historiales", { historiales });
  res.render("recetas", { recetas });
};
export const defaultR = (req, res) => {
  res.render("Historial.ejs");
};
