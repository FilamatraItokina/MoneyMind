const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const cokkieParser = require('cookie-parser');

router.use(cokkieParser());

router.post('/register', auth.Register);
router.get('/register', (req, res) => {
  res.render('register');
})

router.post('/login', auth.Login);
router.get('/login', (req, res) => {
  res.render('login');
})


module.exports = router;