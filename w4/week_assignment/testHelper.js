const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

const queryDb = async (filepath) => {
  const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
  const pool = new Pool(dbConfig);
  const queryFile = fs.readFileSync(filepath, "utf8");
  const res = await pool.query(queryFile);
  pool.end();
  return res;
};

module.exports = { queryDb };
