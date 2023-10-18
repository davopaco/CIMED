import { pool } from "../database.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { hashing, salt } from "../hashing.js";
import multer from "multer";
import { sessions } from "../server.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    cb(null, path.join(__dirname, "..", "..", "pfp"));
  },
  filename: function (req, file, cb) {
    const cedula = req.body.cedulaR;
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    req.customFileName = cedula.toString() + "." + extension;
    console.log("Guardando imagen en multer");
    cb(null, req.customFileName);
  },
});

const fileFilter = async (req, file, cb) => {
  await checkPfp(req);
  if (req.savePfp) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const checkPfp = async (req) => {
  console.log(req.body);
  await checkPfpExistsinPacienteDB(req);
  if (req.savePfp === false) return;
  await checkPfpExistsinMedicoDB(req);
  if (req.savePfp === false) return;
  await checkPfpExistsinLogisticaDB(req);
  if (req.savePfp === false) return;
};

export const upload = multer({ fileFilter, storage: storage });

export const loginUser = async (req, res, next) => {
  const { cedulaL, claveL } = req.body;
  const [rows] = await pool.query("SELECT * FROM PACIENTE WHERE ID=?", [
    cedulaL,
  ]);

  if (rows.length <= 0)
    return res.status(404).json({
      message: "No existe ese paciente!",
    });

  var data = {
    id: cedulaL,
    paciente: 0,
    profesionalMed: 0,
    logistica: 0,
  };
  const [rows1] = await pool.query("SELECT hash FROM PACIENTE WHERE id=?", [
    cedulaL,
  ]);
  if (rows1 != 0) {
    data.paciente = 1;
  }
  const [rows2] = await pool.query(
    "SELECT hash FROM PROFESIONAL_SALUD WHERE id=?",
    [cedulaL]
  );
  if (rows2 != 0) {
    data.profesionalMed = 1;
  }
  const [rows3] = await pool.query("SELECT hash FROM LOGISTICA WHERE id=?", [
    cedulaL,
  ]);
  if (rows3 != 0) {
    data.logistica = 1;
  }

  const isPasswordCorrect = await bcrypt.compare(claveL, rows1[0].hash);

  if (!isPasswordCorrect)
    return res.status(401).json({ message: "La contraseña no es correcta!" });

  if (sessions.includes(cedulaL)) {
    return res.status(409).json({ message: "Ya estas logueado!" });
  }
  sessions.push(cedulaL);
  req.session.profile = { username: cedulaL };
  console.log(req.session);
  req.dataValid = data;
  next();
};

async function pacienteDB(req, res) {
  const {
    cedulaR,
    nombreR,
    sexoR,
    fechaR,
    lugarNacR,
    tipoSangR,
    direccionR,
    fijoR,
    movilR,
    emailR,
    claveR,
    estadoCivR,
  } = req.body;

  var refPfp;
  console.log("Entró a paciente");
  if (req.savePfp === false) {
    refPfp = req.pfp;
  } else {
    refPfp = req.customFileName;
  }
  console.log(refPfp);
  const [rows] = await pool.query("SELECT * FROM PACIENTE WHERE ID = ?", [
    cedulaR,
  ]);
  const saltGen = salt();
  const hashedPsword = hashing(claveR, saltGen);

  if (rows.length > 0)
    return res.status(409).json({
      message: "El paciente ya existe. Intente nuevamente.",
    });

  const [rows1] = await pool.query(
    "INSERT INTO PACIENTE VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      cedulaR,
      (await hashedPsword).toString(),
      sexoR,
      (await saltGen).toString(),
      nombreR,
      fechaR,
      lugarNacR,
      tipoSangR,
      emailR,
      direccionR,
      movilR,
      fijoR,
      estadoCivR,
      refPfp,
    ]
  );
  if (rows1.errno)
    return res.status(503).json({
      message: "Ocurrió un error al crear el paciente. Intente nuevamente.",
    });
  if (rows1.affectedRows > 0)
    return res.status(200).json({
      message: "Usuario creado con éxito!",
    });
}

async function medicoDB(req, res) {
  const { cedulaR, nombreR, tarjetaProfesionalR, claveR, especialidadidR } =
    req.body;
  console.log("Entró a medicoDB");
  var refPfp;

  if (req.savePfp === false) {
    refPfp = req.pfp;
  } else {
    refPfp = req.customFileName;
  }
  const [rows] = await pool.query(
    "SELECT * FROM PROFESIONAL_SALUD WHERE ID = ?",
    [cedulaR]
  );

  const saltGen = salt();
  const hashedPsword = hashing(claveR, saltGen);

  if (rows.length > 0)
    return res.status(409).json({
      message: "El médico ya existe. Intente nuevamente.",
    });

  const [rows1] = await pool.query(
    "INSERT INTO PROFESIONAL_SALUD VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      cedulaR,
      nombreR,
      tarjetaProfesionalR,
      (await hashedPsword).toString(),
      (await saltGen).toString(),
      refPfp,
      especialidadidR,
    ]
  );
  if (rows1.errno)
    return res.status(503).json({
      message: "Ocurrió un error al crear el médico. Intente nuevamente.",
    });
  if (rows1.affectedRows > 0)
    return res.status(200).json({
      message: "Usuario creado con éxito!",
    });
}

async function logisticaDB(req, res) {
  const { cedulaR, nombreR, claveR, emailR, direccionR } = req.body;

  var refPfp;

  if (req.savePfp === false) {
    refPfp = req.pfp;
  } else {
    refPfp = req.customFileName;
  }
  const [rows] = await pool.query("SELECT * FROM LOGISTICA WHERE ID = ?", [
    cedulaR,
  ]);

  const saltGen = salt();
  const hashedPsword = hashing(claveR, saltGen);

  if (rows.length > 0)
    return res.status(409).json({
      message: "El usuario de logística ya existe. Intente nuevamente.",
    });

  const [rows1] = await pool.query(
    "INSERT INTO LOGISTICA VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      cedulaR,
      (await hashedPsword).toString(),
      (await saltGen).toString(),
      nombreR,
      emailR,
      direccionR,
      refPfp,
    ]
  );
  if (rows1.errno)
    return res.status(503).json({
      message:
        "Ocurrió un error al crear el usuario de logística. Intente nuevamente.",
    });
  if (rows1.affectedRows > 0)
    return res.status(200).json({
      message: "Usuario creado con éxito!",
    });
}

async function checkPfpExistsinPacienteDB(req) {
  const [rows] = await pool.query(
    "SELECT referencia_pfp FROM PACIENTE WHERE ID = ?",
    [req.body.cedulaR]
  );
  if (rows.length > 0) {
    req.savePfp = false;
    req.pfp = rows[0].referencia_pfp;
  } else {
    req.savePfp = true;
  }
}

async function checkPfpExistsinLogisticaDB(req) {
  const [rows] = await pool.query(
    "SELECT referencia_pfp FROM LOGISTICA WHERE ID = ?",
    [req.body.cedulaR]
  );
  if (rows.length > 0) {
    req.savePfp = false;
    req.pfp = rows[0].referencia_pfp;
  } else {
    req.savePfp = true;
  }
}

async function checkPfpExistsinMedicoDB(req) {
  const [rows] = await pool.query(
    "SELECT referencia_pfp FROM PROFESIONAL_SALUD WHERE ID = ?",
    [req.body.cedulaR]
  );
  if (rows.length > 0) {
    req.savePfp = false;
    req.pfp = rows[0].referencia_pfp;
  } else {
    req.savePfp = true;
  }
}

export const registerUser = async (req, res) => {
  try {
    var privilegio = 1;
    console.log(req.body.privilegio);
    if (req.body.privilegio) {
      privilegio = req.body.privilegio;
    }
    if (privilegio == 1) await pacienteDB(req, res);
    if (privilegio == 2) await medicoDB(req, res);
    if (privilegio == 4) await logisticaDB(req, res);
  } catch (error) {
    console.log(error);
  }
};

export const defaultR = (req, res) => {
  res.render("Login.ejs");
};

export const redirectValid = (req, res) => {
  const { id, paciente, profesionalMed, logistica } = req.dataValid;
  const dataSend = {
    id: id,
    isAuthenticated: true,
    page: 0,
  };
  let aux = 0;
  if (paciente === 1) aux++;
  if (profesionalMed === 1) aux += 2;
  if (logistica === 1) aux += 4;
  dataSend.page = aux;

  res.status(200).json(dataSend);
};
