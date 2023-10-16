import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../database.js";

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

export const agregarHistorial = async (req, res) => {};
