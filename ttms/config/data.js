const mysql = require("mysql2");

const dbConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"niograph123",
    database: "simple"
});
dbConn.connect(function(error){
    if(error) throw error;
    console.log("Database Connected Successfully!");


});
module.exports=dbConn;