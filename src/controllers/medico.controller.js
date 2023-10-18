import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../database.js";
import { hashing, salt } from "../hashing.js";

export const defaultR = async (req, res) => {
  console.log("Cargando página de logística.");
  const cedulaL = req.params.id;
  const [rows] = await pool.query(
    "SELECT nombre, referencia_pfp FROM PROFESIONAL_SALUD WHERE ID=?",
    [cedulaL]
  );
  const data = {
    nombre: rows[0].nombre,
    refPfp: rows[0].referencia_pfp,
  };
  console.log(data);
  res.render("Login_Doctor.ejs", { data });
};

export const modificarDatos = async (req, res) => {
  const { nombre, clave } = req.body;
  const cedula = req.query.id;
  console.log(req.customFileName);
  const referencia_pfp = req.customFileName;
  const saltGen = salt();
  const hashedPsword = hashing(clave, saltGen);
  console.log("Se está actualizando al usuariooo");
  console.log(req.body);
  const [rows] = await pool.query(
    "UPDATE PROFESIONAL_SALUD SET NOMBRE=?, HASH=?, SALT=?, REFERENCIA_PFP=? WHERE ID=?",
    [
      nombre,
      (await hashedPsword).toString(),
      (await saltGen).toString(),
      referencia_pfp,
      cedula,
    ]
  );
  console.log(rows);
  if (rows.warningStatus != 0) {
    return res.status(401).json({
      message: "No se pudo modificar los datos del paciente.",
    });
  }
  if (rows.warningStatus == 0) {
    return res.status(200).json({
      message: "Sus datos han sido modificados correctamente.",
    });
  }
};

export const modificarDatosVista = async (req, res) => {
  const [datos] = await pool.query(
    "SELECT PS.ID, PS.NOMBRE, TARJETA_PROFESIONAL, REFERENCIA_PFP, NOMBRE_ESPECIALIDAD FROM PROFESIONAL_SALUD PS, ESPECIALIDAD E WHERE PS.ID= ? AND E.ID=ESPECIALIDAD_ID",
    [req.query.id]
  );
  const data = datos[0];
  console.log(data);
  res.render("Formulario_Login_Doctor.ejs", { data });
};

export const getImagen = (req, res, next) => {
  console.log("Cargando imagen.");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileName = path.join(__dirname, "..", "..", "pfp", req.query.refPfp);
  res.sendFile(fileName);
};
