import express from "express";
import loginPacRoutes from "./routes/user.routes.js";
import {PORT} from './config.js';

const app = express();

app.use(express.json());

app.use(loginPacRoutes);

app.use((req, res)=>{
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

app.listen(PORT);
