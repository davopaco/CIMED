import express from "express";
import loginPacRoutes from "./routes/user.routes.js";
import {PORT} from './config.js';
import bodyParser from 'body-parser';
import homeRoutes from "./routes/home.routes.js"
import citaRoutes from "./routes/citas.routes.js"
import pacienteRoutes from "./routes/paciente.routes.js"

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('../public'));
app.use(express.json());
app.use(homeRoutes);
app.use(loginPacRoutes);
app.use(citaRoutes);
app.use(pacienteRoutes);

app.use((req, res)=>{
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

app.listen(PORT);
