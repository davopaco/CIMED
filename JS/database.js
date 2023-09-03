const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alexandra',
    database: 'CIMED',
    insecureAuth: true, // Establece esto a true
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a MySQL:', err);
    } else {
      console.log('Conexión exitosa a MySQL');
    }
  });