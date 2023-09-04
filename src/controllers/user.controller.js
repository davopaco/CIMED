import {pool} from '../database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { hashing, salt } from '../hashing.js';

export const loginUser = async (req, res) => {
    const {loginid, loginpassword} = req.body;
    const id = loginid;
    const password = loginpassword;
    const [rows] = await pool.query('SELECT * FROM PACIENTE WHERE ID=?', [id]);

    if(rows.length<=0) return res.status(404).json({
        message: "No existe ese paciente"
    });

    const [rows1] = await pool.query('SELECT hash FROM PACIENTE WHERE id=?', [id]);

    const isPasswordCorrect = await bcrypt.compare(password, rows1[0].hash);

    if(!isPasswordCorrect) return res.status(401).json({message: "La contraseña no es correcta!"});

    console.log("Login success");
    res.status(200).json({message: "Login success"});
}

export const registerUser = async (req, res) => {
    const id = req.body.registerid;
    const password = req.body.registerpassword;
    console.log(id);
    console.log(password);

    const [rows] = await pool.query("SELECT * FROM PACIENTE WHERE ID = ?",[id]);
    const saltGen=salt();
    const hashedPsword=hashing(password, saltGen);

    if(rows.length>0) return res.status(409).json({
        message: "El paciente ya existe. Intente nuevamente."
    });

    const [rows1] = await pool.query("INSERT INTO PACIENTE (ID, HASH, SALT) VALUES (?, ?, ?)",[id, (await hashedPsword).toString(), (await saltGen).toString()]);
    if(rows1.affectedRows>0) return res.status(200).json({
        message: "Usuario creado con exito!"
    });

}

export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','HTML', 'login.html'));
}
