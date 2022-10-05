const express = require("express");
const { Pool } = require("pg");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const dbCredentials = {
  user: "arthurdilascio",
  host: "localhost",
  database: "week_assignment",
  password: "",
  port: 5432,
};

server.get("/students", (req, res) => {
  const pool = new Pool(dbCredentials);
  pool
    .query("SELECT * FROM students")
    .then((result) => result.rows)
    .then((students) => res.json(students))
    .catch((err) => console.log(err))
    .finally(() => pool.end());
});

server.post("/students", (req, res) => {
  const { name, email, phone, github } = req.body;
  const pool = new Pool(dbCredentials);
  pool
    .query(
      "INSERT INTO students (name, email, phone, github) VALUES($1, $2, $3, $4) RETURNING *",
      [name, email, phone, github]
    )
    .then((result) => result.rows[0])
    .then((student) => res.json(student))
    .catch((err) => console.log(err))
    .finally(() => pool.end());
});

server.listen(8080, () => console.log("server running 8080"));
