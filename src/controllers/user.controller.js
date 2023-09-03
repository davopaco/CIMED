import {pool} from '../database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { hashing, salt } from '../hashing.js';

export const loginUser = async (req, res) => {
    const {id, password} = req.body;
    const [rows] = await pool.query('SELECT * FROM PACIENTE WHERE ID=?', [id]);

    if(rows.length<=0) return res.status(404).json({
        message: "No existe ese paciente"
    });

    const [rows1] = await pool.query('SELECT hash, salt FROM PACIENTE WHERE id=?', [id]);

    const isPasswordCorrect = bcrypt.compare(password, rows1[0].hash)

    if(!isPasswordCorrect) return res.status(401).json({message: "La contraseña no es correcta!"})

    console.log("Login success");
    res.status(200).json({message: "Login success"});
}

export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','HTML', 'login.html'));
}
