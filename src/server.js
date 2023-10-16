import express from "express";
import loginPacRoutes from "./routes/user.routes.js";
import { PORT } from "./config.js";
import { fileURLToPath } from "url";
import * as path from "path";
import bodyParser from "body-parser";
import homeRoutes from "./routes/home.routes.js";
import citaRoutes from "./routes/citas.routes.js";
import pacienteRoutes from "./routes/paciente.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import cambioUsuarioRoutes from "./routes/cambioUsuario.routes.js";
import logisticaRoutes from "./routes/logistica.routes.js";
import medicoRoutes from "./routes/medico.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    name: "session-token",
    secret:
      "YNJRhIywZCsjP2QDtFEfKqDleQ8tVMH6j6Le3T5KAL69IKkaa07yEPf+FDQ7s8bDRFd/R9hOXSjW36eYM0s1froKuwNF9eGXCg1+W/3vIIKBrKMiDY5Fi739s9jEDomx08kr10B1ihC0ngkJYcLHDhbAZ4fsGvl8CoBLuLFyYao=",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      expires: 60 * 60 * 24,
    },
  })
);

export var sessions = [];

app.use(homeRoutes);
app.use(loginPacRoutes);
app.use(citaRoutes);
app.use(pacienteRoutes);
app.use(cambioUsuarioRoutes);
app.use(logisticaRoutes);
app.use(medicoRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
