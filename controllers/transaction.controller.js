// Modifier une transaction
exports.UpdateTransaction = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { amount, type, category, date, description } = req.body;
  Transaction.Update(
    userId,
    id,
    amount,
    type,
    category,
    date,
    description,
    (err, transaction) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(200)
        .json({ message: "Transaction modifiée", transaction });
    }
  );
};

// Supprimer une transaction
exports.DeleteTransaction = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  Transaction.Delete(userId, id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ message: "Transaction supprimée", id });
  });
};
const express = require("express");
const Transaction = require("../models/transaction.model");

exports.CreateTransaction = (req, res) => {
  const { amount, type, category, date, description } = req.body;
  const userId = req.user.id;

  Transaction.Create(
    userId,
    amount,
    type,
    category,
    date,
    description,
    (err, transaction) => {
      if (err) return res.status(500).json({ error: err.message });
      return res
        .status(201)
        .json({ message: "Transaction created", transaction });
    }
  );
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
    return res.render("transactions", {
      summary: summary || [],
      username: req.user.username,
    });
  });
};

exports.renderTransactionPage = (req, res) => {
  const userId = req.user.id;

  Transaction.ReadAll(userId, (err, transactions) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.render("transactions", {
        transactions: [],
        username: req.user.username,
      });
    }

    // Si transactions est null/undefined, utiliser un tableau vide
    const txs = transactions || [];
    // Calcul du résumé
    let income = 0,
      expense = 0;
    txs.forEach((tx) => {
      if (tx.type === "income") income += tx.amount;
      else if (tx.type === "expense") expense += tx.amount;
    });
    const balance = income - expense;
    const summary = { income, expense, balance };
    return res.render("transactions", {
      transactions: txs,
      summary,
      username: req.user.username,
    });
  });
};
