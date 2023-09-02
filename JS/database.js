var mysql = require('mysql');

var con=mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    waitForConnections: true,
    queueLimit: 0
});

con.connect(function(err){
    if(err) throw err;
    console.log("Database was successfully connected!");
});

module.exports = con;