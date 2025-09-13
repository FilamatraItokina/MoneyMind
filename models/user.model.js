const db = require('../data');

db.run(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
  `
);

const User = {

  //Create
  Create: (username, email , password, callback) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [username, email, password], function(err, user) {
      if(err) return callback(err);
      callback(null, {id: this.lastID, username, email});
    });
  },

  //Read
  FindByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, user) => {
      if(err) return callback(err);
      callback(null, user);
    });
  }
}

module.exports = User;