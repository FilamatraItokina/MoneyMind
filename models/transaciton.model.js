const db = require("../data");

db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN('expense','income')),
    desc TEXT DEFAULT '',
    date TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

const Transaction = {
  // Create
  Create: (amount, date, type, category, desc, userId, callback) => {
    db.run(
      `INSERT INTO transactions (amount, date, type, category, desc, user_id) VALUES (?,?,?,?,?,?)`,
      [amount, date, type, category, desc, userId],
      function (err) {
        if (callback) callback(err, {id: this.lastID, amount, date, type, desc});
      }
    );
  },

  // ReadAll
  ReadAll: (userId, callback) => {
    db.all(
      `SELECT * FROM transactions WHERE user_id = ?`,
      [userId],
      function(err, transactions){

        let total_income = 0;
        let total_expense = 0;

        transactions.forEach(transaction => {
          if(transaciton.type === 'expense'){
            total_income = transaction.amount;
          } else if(transaction.type === 'income'){
            total_expense = transaction.amount;
          }
        });

        let balance = total_income - total_expense;
        callback(err, {transactions, total_expense, total_income, balance});
      }
    );
  },

  // Update
  Update: (amount, date, type, category, desc, userId, id, callback) => {
    db.run(
      `UPDATE transactions 
        SET amount = ?, date = ?, type = ?, category = ?, desc = ? 
        WHERE user_id = ? AND id = ?`,
      [amount, date, type, category, desc, userId, id],
      function (err) {
        if (callback) callback(err, { changes: this.changes });
      }
    );
  },

  // Delete
  Delete: (userId, id, callback) => {
    db.run(
      `DELETE FROM transactions WHERE user_id = ? AND id = ?`,
      [userId, id],
      function (err) {
        if (callback) callback(err, { changes: this.changes });
      }
    );
  },

  // FilterByDate
  FilterByDate: (date, userId, callback) => {
    db.all(
      `SELECT * FROM transactions WHERE user_id = ? AND date = ?`,
      [userId, date],
      function (err, transactions) {
        if (callback) callback(err, transactions);
      }
    );
  },

  // FilterByType
  FilterByType: (type, userId, callback) => {
    db.all(
      `SELECT * FROM transactions WHERE user_id = ? AND type = ?`,
      [userId, type],
      function (err, transactions) {
        if (callback) callback(err, transactions);
      }
    );
  },

  // FilterByCategory
  FilterByCtg: (category, userId, callback) => {
    db.all(
      `SELECT * FROM transactions WHERE user_id = ? AND category = ?`,
      [userId, category],
      function (err, transactions) {
        if (callback) callback(err, transactions);
      }
    );
  }
};

module.exports = Transaction;
