const router = require('express').Router();
const transaction = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', transaction.renderTransactionPage);

router.post('/', transaction.CreateTransaction);
router.get('/', transaction.GetAllTransactions);
router.get('/category/:category', transaction.GetTransactionsByCategory);
router.get('/type/:type', transaction.GetTransactionsByType);
router.get('/date/:date', transaction.GetTransactionsByDate);
router.get('/summary', transaction.GetTransactionsSummary);

module.exports = router;