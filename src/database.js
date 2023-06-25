//CONEXIÓN CON LA BASE DE DATOS
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'codenotch',
        database: 'appLibrary',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0
});

console.log("Conexión con la BBDD realizada con éxito");

//exportar conexión con la BBDD
module.exports = { pool };