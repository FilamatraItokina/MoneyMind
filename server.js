require('dotenv').config();
const {log} = require('console');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require('./routes/auth.route');
const transactionRoute = require('./routes/transaction.route');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(cookieParser()); 
app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use('/auth', authRoute);
app.use('/transactions', transactionRoute);


app.listen(port, () => {
  log(`Server running on http://localhost:${port}`);
});