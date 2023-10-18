import { pool } from "../database.js";

export const cambioUsuarioPage = async (req, res) => {
  const dataSend = {
    id: req.query.id,
    page: req.query.page,
  };
  const { nombre, referencia_pfp } = await consultaDB(
    dataSend.id,
    dataSend.page
  );
  dataSend.nombre = nombre;
  dataSend.refPfp = referencia_pfp;
  console.log(dataSend);
  res.render("cambio_usuario.ejs", { dataSend });
};

async function consultaDB(id, page) {
  if (page % 2 != 0) {
    const [rows] = await pool.query(
      "SELECT nombre, referencia_pfp FROM PACIENTE WHERE ID = ?",
      [id]
    );
    console.log(rows[0]);
    return rows[0];
  }
  if (page == 3 || page == 6) {
    const [rows] = await pool.query(
      "SELECT nombre, referencia_pfp FROM PROFESIONAL_SALUD WHERE ID = ?",
      [id]
    );
    return rows[0];
  }
  if (page == 5) {
    const [rows] = await pool.query(
      "SELECT nombre, referencia_pfp FROM LOGISTICA WHERE ID = ?",
      [id]
    );
    return rows[0];
  }
}
