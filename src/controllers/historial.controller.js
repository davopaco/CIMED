import {pool} from "../database.js"
import path from 'path';
import { fileURLToPath } from 'url';

export const postCitas = async (req,res) =>{
    const{hora,nombre,fecha_asig,medico} = req.body
    const id_paciente = req.params.id_paciente


    const [rows1] = await pool.query("Select id from profesional_salud where nombre = ?",[medico])
    const id_medico = rows1[0].id


    const [rows] = await pool.query("Insert INTO cita (hora,fecha_asig,id_paciente, id_medico,tipo) VALUES (?,?,?,?,?)", [hora,fecha_asig,id_paciente, id_medico,1])
    res.send({
        id: rows.insertId,
        hora,
        fecha_asig,
        id_paciente,
        id_medico
    })

}

export const getCitas = async (req, res) =>{
    const [rows] = await pool.query("Select ID_PACIENTE, fecha_asig, hora from cita where id_medico = ?", [req.params.id_medico])
    res.json(rows)

}
export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','HTML', 'citas.html'));
}