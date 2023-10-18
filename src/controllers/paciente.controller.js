import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../database.js";
import multer from "multer";
import { hashing, salt } from "../hashing.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    cb(null, path.join(__dirname, "..", "..", "pfp"));
  },
  filename: function (req, file, cb) {
    const cedula = req.query.id;
    let extArray = file.mimetype.split("/");
    let extension = "jpeg";
    console.log("Guardando imagen.");
    req.customFileName = cedula.toString() + "." + extension;
    cb(null, req.customFileName);
  },
});

export const upload = multer({ storage: storage });

export const modificarDatosVista = async (req, res) => {
  const [datos] = await pool.query(
    "SELECT ID, SEXO, NOMBRE, DATE_FORMAT(FECHA_NACIMIENTO, '%Y-%m-%d') AS FECHA_NACIMIENTO, LUGAR_NACIMIENTO, ESTADO_CIVIL, TELEFONO_MOVIL, TELEFONO_FIJO, EMAIL, DIRECCION, TIPO_SANGRE, REFERENCIA_PFP FROM PACIENTE WHERE ID= ?",
    [req.query.id]
  );
  const data = datos[0];
  console.log(data);
  res.render("Formulario_Login.ejs", { data });
};

export const modificarDatos = async (req, res) => {
  const {
    nombre,
    lugar_nac,
    estado_civil,
    movil,
    fijo,
    email,
    direccion,
    clave,
  } = req.body;
  const cedula = req.query.id;
  console.log(req.customFileName);
  const referencia_pfp = req.customFileName;
  const saltGen = salt();
  const hashedPsword = hashing(clave, saltGen);
  console.log("Se está actualizando al usuariooo");
  console.log(req.body);
  const [rows] = await pool.query(
    "UPDATE PACIENTE SET NOMBRE=?, HASH=?, SALT=?, LUGAR_NACIMIENTO=?, ESTADO_CIVIL=?, TELEFONO_MOVIL=?, TELEFONO_FIJO=?, EMAIL=?, DIRECCION=?, REFERENCIA_PFP=? WHERE ID=?",
    [
      nombre,
      (await hashedPsword).toString(),
      (await saltGen).toString(),
      lugar_nac,
      estado_civil,
      movil,
      fijo,
      email,
      direccion,
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
  res.sendFile(fileName);
};
