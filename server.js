require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require('./routes/auth.route');
const TransactionRoute = require('./routes/transaction.route');


app.use(express.json());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));  
app.set('view engine', 'ejs');

app.use('/auth', authRoute);
app.use('/transactions', TransactionRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});