const slqite3 = require('sqlite3').verbose();
const db = new slqite3.Database('./database.db', (err) => {
  if(err) return console.log('Erreur lors de la connexion a la base de données');
  return console.log('Connected to the database');
});

module.exports = db;