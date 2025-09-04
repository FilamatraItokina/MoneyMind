const Transaction = require("../models/transaciton.model");
require('dotenv').config();


// Ajouter une nouvelle transaction
exports.AddNewTransaction = (req, res) => {
  console.log("req.user:", req.user);
  const { amount, date, type, category, desc } = req.body;
  const userId = req.user.id;

  if (!amount || !date || !type || !category)
    return res.status(400).json({ message: "Les champs sont requis" });

  Transaction.Create(
    amount,
    date,
    type,
    category,
    desc,
    userId,
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      return res.status(201).json({ message: "Transaction ajoutée", result });
    }
  );
};

// Lire toutes les transactions
exports.ReadAllTransactions = (req, res) => {
  const userId = req.user.id;

  Transaction.ReadAll(userId, function (err, transactions) {
    if (err) return res.status(500).json({ error: err.message });
    if (transactions.length === 0)
      return res.status(404).json({ message: "Aucune transaction trouvée" });
    return res.status(200).json(transactions);
  });
};

// Modifier une transaction
exports.UpdateTransaction = (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { amount, date, type, category, desc } = req.body;

  if (!amount || !date || !type || !category)
    return res.status(400).json({ message: "Les champs sont requis" });

  Transaction.Update(
    amount,
    date,
    type,
    category,
    desc,
    userId,
    id,
    function (err, result) {
      if (err) return res.status(500).json({ error: err.message });
      if (result.changes === 0)
        return res.status(404).json({ message: "Aucune transaction trouvée" });
      return res
        .status(200)
        .json({ message: "Transaction modifiée", changes: result.changes });
    }
  );
};

// Effacer une transaction
exports.DeleteTransaction = (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  Transaction.Delete(userId, id, function (err, result) {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0)
      return res.status(404).json({ message: "Aucune transaction trouvée" });
    return res
      .status(200)
      .json({ message: "Transaction effacée", changes: result.changes });
  });
};

// Filtrer par date
exports.FilterByDate = (req, res) => {
  const { date } = req.body;
  const userId = req.user.id;

  Transaction.FilterByDate(date, userId, function (err, transactions) {
    if (err) return res.status(500).json({ error: err.message });
    if (transactions.length === 0)
      return res.status(404).json({ message: "Aucune transaction trouvée" });
    return res.status(200).json(transactions);
  });
};

// Filtrer par type
exports.FilterByType = (req, res) => {
  const { type } = req.body;
  const userId = req.user.id;

  Transaction.FilterByType(type, userId, function (err, transactions) {
    if (err) return res.status(500).json({ error: err.message });
    if (transactions.length === 0)
      return res.status(404).json({ message: "Aucune transaction trouvée" });
    return res.status(200).json(transactions);
  });
};

// Filtrer par catégorie
exports.FilterByCtg = (req, res) => {
  const { category } = req.body;
  const userId = req.user.id;

  Transaction.FilterByCtg(category, userId, function (err, transactions) {
    if (err) return res.status(500).json({ error: err.message });
    if (transactions.length === 0)
      return res.status(404).json({ message: "Aucune transaction trouvée" });
    return res.status(200).json(transactions);
  });
};
