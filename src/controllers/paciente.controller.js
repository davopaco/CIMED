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
  const [rows] = await pool.query("SELECT nombre FROM PACIENTE WHERE ID=?", [
    cedulaL,
  ]);
  const data = {
    "nombre": rows[0].nombre,
  };
  res.render("Login_Usuario.ejs", { data });
};

export const getImagen = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.sendFile(path.join(__dirname, "..", "..", "pfp", req.params.id));
};
