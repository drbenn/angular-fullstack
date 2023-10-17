const express = require("express");
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const namecheapDb = {
  host: "localhost",
  user: "root",
  password: "pass",
  database: "booyah",
}

const db = mysql.createConnection(namecheapDb);


app.get('/booyah/test', async (req, res) => {
  try {
    res.send(`Hello, World! The current time is: ${new Date()}`);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error');
  }
});

app.post('/booyah/message', async (req, res) => {
  const message = req.body;
  console.log(message);
});