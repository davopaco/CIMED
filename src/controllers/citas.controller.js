import path from 'path';
import { fileURLToPath } from 'url';
import {pool} from "../database.js"

export const postCitas = async (req,res) =>{
    const{hora,nombre,fecha_asig,medico} = req.body
    const id_paciente = req.params.id_paciente


    const [rows1] = await pool.query("SELECT ID FROM PROFESIONAL_SALUD WHERE NOMBRE = ?",[medico])
    const id_medico = rows1[0].id


    const [rows] = await pool.query("INSERT INTO CITA (FECHA_ASIG,PACIENTE_ID,ID_MEDICO,TIPO) VALUES (?,?,?,?)", [fecha_asig,id_paciente, id_medico,1])
    res.send({
        id: rows.insertId,
        hora,
        fecha_asig,
        id_paciente,
        id_medico
    })

}

export const getCitas = async (req, res) =>{
    const [rows] = await pool.query("SELECT PACIENTE_ID, FECHA_ASIG FROM CITA WHERE ID_MEDICO = ?", [req.params.id_medico])
    res.json(rows)

}
export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','public', 'html', 'cita.html'));
}

