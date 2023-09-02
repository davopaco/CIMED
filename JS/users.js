const bcrypt = require("bcrypt");
const express = require("express");
const database=require('./database.js');
const app =express();

function salt(){
    const salt = bcrypt.genSaltSync(10);
    return salt;
}

function hashing(password, salt){
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const connection = database.con

app.post("/register", (req, res) => {
    const { username,email, password } = req.body;
    const salt=salt();
    hashedPsword=hashing(password, salt);
  
    // Check if the username already exists
    connection.query(
      "SELECT * FROM PACIENTE WHERE ID = ?",
      [username],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error. No se pudo procesar.");
        } else if (rows.length > 0) {
          res.status(409).send("Este usuario ya existe. Intente nuevamente.");
        } else {
          // Insert the user into the database
          connection.query(
            "INSERT INTO PACIENTE (ID, HASH, EMAIL, SALT) VALUES (?, ?, ?, ?)",
            [username, hashedPsword, email, salt],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send("Error");
              } else {
                res.status(200).send("Usuario registrado con éxito");
              }
            }
          );
        }
      }
    );
  });
  
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });