const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE

})

app.get('/', (re, res) => {
  return res.json("from backend");
});

app.get('/leaderboard', (req, res) => {
  const sql = "SELECT * FROM leaderboard";
  db.query(sql, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.listen(3001, () => {
  console.log('listening on port 3001');
})