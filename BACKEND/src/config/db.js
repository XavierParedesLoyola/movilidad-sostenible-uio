require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
    }
};

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log('Conectado a SQLServer');
    return pool;
})
.catch(err => {
    console.error('Error de conexion a SQLServer:', err);
});

module.exports = {
    sql, poolPromise
};