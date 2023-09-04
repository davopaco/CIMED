
import {pool} from "../database.js"

export const postCitas = async (req,res) =>{
    const{hora,fecha_asig,id_paciente, id_medico} = req.body
    const [rows] = await pool.query("Insert INTO cita (hora,fecha_asig,id_paciente, id_medico) VALUES (?,?,?)", [hora,fecha_asig,id_paciente, id_medico])
    res.send({
        id: rows.insertId,
        hora,
        fecha_asig,
        id_paciente,
        id_medico
    })


}

export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','HTML', 'cita.html'));
}

