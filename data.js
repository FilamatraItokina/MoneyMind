const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('money_mind.db', (err) => {
  if(err) return console.error(err.message);
  console.log('Connected to the SQLite database.');
});

module.exports = db;