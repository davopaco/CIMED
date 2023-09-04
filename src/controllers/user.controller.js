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

    const isPasswordCorrect = await bcrypt.compare(password, rows1[0].hash)

    if(!isPasswordCorrect) return res.status(401).json({message: "La contraseña no es correcta!"});

    console.log("Login success");
    res.status(200).json({message: "Login success"});
}

// export const registerUser = async (req, res) => {
//     const {cedulaR, emailR, claveR} = req.body;

//     const [rows] = await pool.query("SELECT * FROM PACIENTE WHERE ID = ?",[cedulaR]);
//     const saltGen=salt();
//     const hashedPsword=hashing(claveR, saltGen);

//     if(rows.length>0) return res.status(409).json({
//         message: "El paciente ya existe. Intente nuevamente."
//     });

//     const [rows1] = await pool.query("INSERT INTO PACIENTE (ID, HASH, EMAIL, SALT) VALUES (?, ?, ?, ?)",[cedulaR, (await hashedPsword).toString(), emailR, (await saltGen).toString()]);
//     if(rows1.affectedRows>0) return res.status(200).json({
//         message: "Usuario creado con exito!"
//     });


export const registerUser = async (req, res) => {
    const { cedulaR,
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
        estadoCivR
    } = req.body;

    const [rows] = await pool.query("SELECT * FROM PACIENTE WHERE ID = ?",[cedulaR]);
    const saltGen=salt();
    const hashedPsword=hashing(claveR, saltGen);

    if(rows.length>0) return res.status(409).json({
        message: "El paciente ya existe. Intente nuevamente."
    });

    const [rows1] = await pool.query("INSERT INTO PACIENTE VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)",[cedulaR, (await hashedPsword).toString(), sexoR, (await saltGen).toString(), nombreR, fechaR, lugarNacR, tipoSangR, emailR, direccionR, movilR, fijoR, estadoCivR]);
    if(rows1.affectedRows>0) return res.status(200).json({
        message: "Usuario creado con exito!"
    });

}

export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','Js', 'index.js'));
    res.sendFile(path.join(__dirname,'..','..','Js', 'login.js'));
    res.sendFile(path.join(__dirname,'..','..','HTML', 'Login.html'));
}
