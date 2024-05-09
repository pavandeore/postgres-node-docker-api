const express = require("express");
const pool = require("./db");
const port = 1337;

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM school");
    res.status(200).send(data.rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/", async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query("INSERT INTO school(name, address) VALUES($1, $2)", [
      name,
      location,
    ]);
    res.status(200).send({ message: "Entry Added!" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE school( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))"
    );
    res.status(200).send({ message: "Schema Created!" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log("server working on port " + port);
});
