const db = require("../data");

db.run(
  `
  CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  category TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT DEFAULT '',
  FOREIGN KEY(user_id) REFERENCES users(id)
  )
  `
);

const Transaction = {
  // Create
  Create: (userId, amount, type, category, date, description, callback) => {
    const query = `INSERT INTO transactions (user_id, amount, type, category, date, description) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(
      query,
      [userId, amount, type, category, date, description],
      function (err) {
        if (err) return callback(err);
        callback(null, {
          id: this.lastID,
          userId,
          amount,
          type,
          category,
          date,
          description,
        });
      }
    );
  },
  // Read
  ReadAll: (userId, callback) => {
    const query = `SELECT * FROM transactions WHERE user_id = ?`;
    db.all(query, [userId], (err, transactions) => {
      if (err) return callback(err);
      callback(null, transactions);
    });
  },

  FindByCtg: (userId, category, callback) => {
    const query = `SELECT * FROM transactions WHERE user_id = ? AND category = ?`;
    db.all(query, [userId, category], (err, transactions) => {
      if (err) return callback(err);
      callback(null, transactions);
    });
  },

  FindByType: (userId, type, callback) => {
    const query = `SELECT * FROM transactions WHERE user_id = ? AND type = ?`;
    db.all(query, [userId, type], (err, transactions) => {
      if (err) return callback(err);
      callback(null, transactions);
    });
  },

  FindByDate: (userId, date, callback) => {
    const query = `SELECT * FROM transactions WHERE user_id = ? AND date = ?`;
    db.all(query, [userId, date], (err, transactions) => {
      if (err) return callback(err);
      callback(null, transactions);
    });
  },

  Summary: (userId, callback) => {
    const query = `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
      FROM transactions
      WHERE user_id = ?
    `;
    db.get(query, [userId], (err, summary) => {
      if (err) return callback(err);
      callback(null, summary);
    });
  },
  // Update
  Update: (userId, id, amount, type, category, date, description, callback) => {
    const query = `UPDATE transactions SET amount = ?, type = ?, category = ?, date = ?, description = ? WHERE id = ? AND user_id = ?`;
    db.run(
      query,
      [amount, type, category, date, description, id, userId],
      function (err) {
        if (err) return callback(err);
        callback(null, {
          id,
          userId,
          amount,
          type,
          category,
          date,
          description,
        });
      }
    );
  },
  // Delete
  Delete: (userId, id, callback) => {
    const query = `DELETE FROM transactions WHERE id = ? AND user_id = ?`;
    db.run(query, [id, userId], function (err) {
      if (err) return callback(err);
      callback(null, { id });
    });
  },
};

module.exports = Transaction;
