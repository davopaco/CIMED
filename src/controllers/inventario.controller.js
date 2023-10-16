import { pool } from "../database.js";
import path from "path";
import { fileURLToPath } from "url";

export const postProducto = async (req, res) => {
  const {
        id,
        nombre,
        descripcion,
        categoria,
        cantidad_stock,
        cantidad_min,
        cantidad_max,
  } = req.body;
  const [productos] = await pool.query(
    "INSERT INTO PRODUCTOS (ID, NOMBRE, DESCRIPCION, CATEGORIA, CANTIDAD_STOCK, CANTIDAD_MIN, CANTIDAD_MAX) VALUES (?,?,?,?,?,?,?)",
    [
        id,
        nombre,
        descripcion,
        categoria,
        cantidad_stock,
        cantidad_min,
        cantidad_max,
    ]
  );


  res.redirect;
};
export const getProducto = async (req, res) => {
    const id = req.params.id;
    const [productos] = await pool.query(
    "SELECT * FROM PRODUCTO WHERE ID = ?",
    [id]
  );
  res.render("productos", {productos});
  //res.json(productos[0]);
//hola

};
export const defaultR = async(req, res) => {
    const [productos] = await pool.query(
    "SELECT * FROM PRODUCTO; ",
  );
  res.render("productos", {productos});
};
