const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DB_PORT, 10),
});

const db = pool.promise(); // This enables the `query` method.
module.exports = db;
