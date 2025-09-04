require("dotenv").config();
const { log } = require("console");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.Register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Tous les champs sont requis" });

  const hashed = await bcrypt.hash(password, 10);

  User.New(username, email, hashed, function (err, result) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(409).json({ message: "Email already used " });
      }
      return res.status(500).json({ error: err.message });
    }

    const userId = result.id;

    const token = jwt.sign(
      { id: userId, username, email },
      process.env.JWT_SECRET || "secret secret****",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    return res
      .status(201)
      .json({
        message: "Inscription réussi",
        username: result.username,
        email: result.email,
        token,
      });
  });
};

exports.Login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Tous les champs sont requis" });

  User.FindByEmail(email, async function (err, user) {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET || "secret secret****",
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSit: false,
      secure: true,
    });

    return res.status(200).json({ message: "Connexion réussi", token });
  });
};
