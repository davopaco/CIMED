import { pool } from "../database.js";
import path from "path";
import { fileURLToPath } from "url";

export const agregarHistorial = async (req, res) => {
  const {
    fecha,
    sintomas,
    examen,
    resultados,
    alergias,
    ante_med,
    ante_fam,
    medic_ant,
    paciente,
    receta_medica,
  } = req.body;
  const id_cita = paciente;
  const [rows] = await pool.query(
    "SELECT id_medico, paciente_id FROM CITA WHERE ID =?",
    [id_cita]
  );
  const id_medico = rows[0].id_medico;
  const id_paciente = rows[0].paciente_id;

  const [historiales] = await pool.query(
    "INSERT INTO HISTORIAL_CLINICO (FECHA_FORM, PASADO_MED, SINTOMAS, HISTORIAL_FAMILIAR, HISTORIAL_MEDICACION, ALERGIAS, RESULTADOS_LAB, EXAMEN_FIS, PACIENTE_ID, PROFESIONAL_SALUD_ID) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      fecha,
      ante_med,
      sintomas,
      ante_fam,
      medic_ant,
      alergias,
      resultados,
      examen,
      id_paciente,
      id_medico,
    ]
  );

  var recetas;
  if (receta_medica == true) {
    [recetas] = await pool.query(
      "INSERT INTO RECETA_MEDICA (CODIGO_MEDICAMENTO, PROFESIONAL_SALUD_ID, HISTORIAL_CLINICO_ID, PACIENTE_ID) VALUES (?,?,?,?,?)",
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

export const defaultR = async (req, res) => {
  const [rows1] = await pool.query(
    "SELECT p.nombre, c.id, fecha_asig FROM PACIENTE p, CITA c WHERE c.paciente_id = p.id"
  );
  const codigosMed = ["INF123", "MED456", "ING789"];
  const meds = [
    "Acetaminofén 500 mg",
    "Acido Bórico 5 G",
    "Acetato de Aluminio",
  ];
  const data = rows1;
  res.render("Historial.ejs", { data, codigosMed, meds });
};
