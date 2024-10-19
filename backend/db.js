const mysql = require('mysql');

module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aboudehmhd12",
    database: "producers_planet"
})