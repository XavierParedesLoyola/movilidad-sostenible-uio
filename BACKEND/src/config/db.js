require('dotenv').config();

console.log(process.env)

const sql = require("mssql");

const dbSettings = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(dbSettings)
  .connect()
  .then(pool => {
    console.log("Conectado a SQL Server");
    return pool;
  })
  .catch(err => console.log("Error de conexión a la BD:", err));

module.exports = {
  sql, poolPromise
};
