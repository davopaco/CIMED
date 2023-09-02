const bcrypt = require("bcrypt");
const express = require("express");
const database=require('./database.js');
const app =express();

const connection = database.con;

app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username exists
    connection.query(
      "SELECT * FROM PACIENTE WHERE ID = ?",
      [username],
      (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error");
        } else if (rows.length === 0) {
          res.status(401).send("Username does not exist");
        } else {
          // Check if the password is correct
          const hashedPassword = rows[0].password;
          const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
  
          if (!isPasswordCorrect) {
            res.status(401).send("Invalid password");
          } else {
            // The user is logged in
            res.status(200).send("User logged in");
          }
        }
      }
    );
  });

  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });