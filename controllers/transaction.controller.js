const e = require('express');
const Transaction = require('../models/transaction.model');

exports.CreateTransaction = (req, res) => {
  const { amount, type, category, date, description } = req.body;
  const userId = req.user.id;

  Transaction.Create(userId, amount, type, category, date, description, (err, transaction) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ message: "Transaction created", transaction });
  });
};

exports.GetAllTransactions = (req, res) => {
  const userId = req.user.id;

  Transaction.ReadAll(userId, (err, transactions) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ transactions });
  });
};  

exports.GetTransactionsByCategory = (req, res) => {
  const userId = req.user.id;
  const { category } = req.params;

  Transaction.FindByCtg(userId, category, (err, transactions) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ transactions });
  });
};

exports.GetTransactionsByType = (req, res) => {
  const userId = req.user.id;
  const { type } = req.params;

  Transaction.FindByType(userId, type, (err, transactions) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ transactions });
  });
};

exports.GetTransactionsByDate = (req, res) => {
  const userId = req.user.id;
  const { date } = req.params;

  Transaction.FindByDate(userId, date, (err, transactions) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ transactions });
  });
};

exports.GetTransactionsSummary = (req, res) => {
  const userId = req.user.id;  

  Transaction.Summary(userId, (err, summary) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ summary }); 
  });
}

exports.renderTransactionPage = (req, res) => {
  res.render('transactions'); // ou res.sendFile(...) selon ton moteur de rendu
} 