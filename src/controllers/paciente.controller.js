import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../database.js";

export const getDatos = async (req, res) => {
  const [rows] = await pool.query(
    "Select nombre, id , tipo_sangre, telefono_movil, email, direccion from paciente where id= ?",
    [req.params.id_paciente]
  );
  res.json(rows);
};

export const defaultR = async (req, res) => {
  console.log("Cargando página de paciente.");
  const cedulaL = req.params.id;
  const [rows] = await pool.query(
    "SELECT nombre, referencia_pfp FROM PACIENTE WHERE ID=?",
    [cedulaL]
  );
  const data = {
    nombre: rows[0].nombre,
    refPfp: rows[0].referencia_pfp,
  };
  console.log(data);
  res.render("Login_Usuario.ejs", { data });
};

export const getImagen = (req, res, next) => {
  console.log("Cargando imagen.");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileName = path.join(__dirname, "..", "..", "pfp", req.query.refPfp);
  res.download(fileName);
};
