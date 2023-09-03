const express = require('express');
const app = express();
const database = require('./database.js');
const hostname = '127.0.0.1';
const port = 3000;
app.set('port',process.env.PORT || 3000);

const connection = database.js;

app.get('/agendar',(req,res) => {
    const {nombre,especialidad, fecha,hora,doctor} = req.body;

  

    const consultaPaciente = 'SELECT id from paciente where nombre = ?';
    const consultaDoctor = 'SELECT id from profesional_salud where nombre = ?';

    connection.query(consultaPaciente, [nombre], (err, resultado) =>{
        if(err){
            console.error('Error en buscar el id del paciente: ', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if(resultado.length === 0){
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        const id_Paciente = resultados[0].id;
    }
    );

    connection.query(consultaDoctor,[doctor],(err,resultado) =>{
        if(err){
            console.error('Error en buscar el id del doctor: ', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if(resultado.length === 0){
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        const id_medico = resultados[0].id;
    }
    );

    const inse = 'INSERT INTO cita (fecha, id_Paciente,id_Medico) VALUES (?,?,?)';

    connection.query(inse , [fecha, id_Paciente,id_medico],(err,resultado) =>
    {
        if (err) {
            console.error('Error al agregar la cita:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
          }
          res.json({ mensaje: 'Cita agregada con éxito' });
    }        
    );
}
);


app.listen(app.get('port'), hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });