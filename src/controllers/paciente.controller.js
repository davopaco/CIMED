import {pool} from "../database.js"

export const getDatos = async (req,res) =>{
    const [rows]= await pool.query("Select nombre, id , tipo_sangre, telefono_movil, email, direccion from paciente where id= ?", 
    [req.params.id_paciente])
    res.json(rows)
}



export const defaultR = (req, res)=>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    res.sendFile(path.join(__dirname,'..','..','HTML', 'paciente.html'));
}


