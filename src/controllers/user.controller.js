import {pool} from '../database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { hashing, salt } from '../hashing.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../pfp')
    },
    filename: function (req, file, cb) {
        const cedula = req.body.cedulaR;
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        req.customFileName = cedula.toString()+'.'+extension;
        cb(null, req.customFileName);
    }
})

export const upload = multer({ storage: storage });

export const loginUser = async (req, res) => {
    const {cedulaL, claveL} = req.body;
    const [rows] = await pool.query('SELECT * FROM PACIENTE WHERE ID=?', [cedulaL]);

    if(rows.length<=0) return res.status(404).json({
        message: "No existe ese paciente!"
    });

    const [rows1] = await pool.query('SELECT hash FROM PACIENTE WHERE id=?', [cedulaL]);

    const isPasswordCorrect = await bcrypt.compare(claveL, rows1[0].hash)

    if(!isPasswordCorrect) return res.status(401).json({message: "La contraseña no es correcta!"});

    console.log("Login success");
    res.status(200).json({message: "Login success"});
    res.sendFile(path.join(__dirname,'..','..','public', 'html', 'Login.html'));
}

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

    const refPfp = req.customFileName;

    const [rows] = await pool.query("SELECT * FROM PACIENTE WHERE ID = ?",[cedulaR]);
    const saltGen=salt();
    const hashedPsword=hashing(claveR, saltGen);

    if(rows.length>0) return res.status(409).json({
        message: "El paciente ya existe. Intente nuevamente."
    });

    const [rows1] = await pool.query("INSERT INTO PACIENTE VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[cedulaR, (await hashedPsword).toString(), sexoR, (await saltGen).toString(), nombreR, fechaR, lugarNacR, tipoSangR, emailR, direccionR, movilR, fijoR, estadoCivR, refPfp]);
    if(rows1.affectedRows>0) return res.status(200).json({
        message: "Usuario creado con exito!"
    });

}

export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','public', 'html', 'Login.html'));
}
