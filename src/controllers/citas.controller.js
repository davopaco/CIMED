
import {pool} from "../database.js"

export const postCitas = async (req,res) =>{
    const{hora,fecha_asig,medico} = req.body
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

export const getCitas = async(req,res) => {
    const [rows]= await pool.query("Select * from cita where id_medico = ?", [req.params.id_doctor])   
    console.log(rows)
    res.json[rows[0]]
}

export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','HTML', 'cita.html'));
}

