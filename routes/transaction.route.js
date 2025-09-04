const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const Transaction = require("../controllers/transaction.controller");

router.use(authMiddleware);

//Ajout d'une transaction
router.post("/", Transaction.AddNewTransaction);

// Lecture des transactions et affichage de la page home
router.get("/home", async (req, res) => {
  const userId = req.user.id;
  const TransactionModel = require("../models/transaciton.model");
  TransactionModel.ReadAll(userId, function (err, transactions) {
    if (err) return res.status(500).json({ error: err.message });

    // Calcul des totaux
    let total_income = 0;
    let total_expense = 0;
    let balance = 0;
    if (transactions && transactions.length > 0) {
      transactions.forEach((t) => {
        if (t.type === "income") total_income += Number(t.amount);
        else if (t.type === "expense") total_expense += Number(t.amount);
      });
      balance = total_income - total_expense;
    }

    res.render("home", {
      user: req.user,
      transactions,
      total_income,
      total_expense,
      balance,
    });
  });
});

//Modification d'une transaction
router.put("/:id", Transaction.UpdateTransaction);

//Supprimer une transaction
router.delete("/:id", Transaction.DeleteTransaction);

//Filtrer par date
router.get("/date", Transaction.FilterByDate);

//Filtrer par type
router.get("/type", Transaction.FilterByType);

//Filtrer par catégorie
router.get("/categories", Transaction.FilterByCtg);

module.exports = router;
