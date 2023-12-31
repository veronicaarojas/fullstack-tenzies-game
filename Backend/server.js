const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());


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
  const { page = 1, pageSize = 5 } = req.query;
  
  const offset = (page - 1) * pageSize;
  const sql = "SELECT * FROM leaderboard ORDER BY Rolls ASC LIMIT ?, ?";
  db.query(sql, [offset, parseInt(pageSize)], (err, data) => {
    if(err) return res.json(err);

    const totalRecordsSql = 'SELECT COUNT(*) AS total FROM leaderboard';
    db.query(totalRecordsSql, (err, totalCountResult) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const totalRecords = totalCountResult[0].total;


      const totalPages = Math.ceil(totalRecords / pageSize);
    return res.json({
      records: data,
      currentPage: parseInt(page),
      totalPages,
    });
  })
});
});




app.post('/save-rolls', (req, res) => {
  const {Rolls, Date} = req.body;

  const sql = `INSERT INTO leaderboard (Rolls, Date) VALUES ('${Rolls}', '${Date}')`;
  db.query(sql, (err, result) => {
    if(err) {
      return res.json(err);
    }
    return res.json({ message: "Record inserted"})
  })
});

app.delete('/delete-roll/:RollID', (req, res) => {
  const { RollID } = req.params;

  const sql = `DELETE FROM leaderboard WHERE RollID = ${RollID}`;
  db.query(sql, (err, result) => {
    if(err) {
      return res.json(err);
    }
    if(result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found"});
    }

    return res.json({ message: `Record ${RollID} deleted`});
  })
})

app.listen(3001, () => {
  console.log('listening on port 3001');
})