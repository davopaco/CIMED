const bcrypt = require("bcrypt");
import database from './database.js';

function salt(){
    const salt = bcrypt.genSaltSync(10);
    return salt;
}

function hashing(clave){
    const hash = bcrypt.hashSync(clave, salt());
    return hash;
}

const con.database
