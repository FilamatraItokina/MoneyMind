# MoneyMind – Documentation

## Présentation

MoneyMind est une application web de gestion de finances personnelles permettant à un utilisateur de s’inscrire, se connecter, enregistrer des transactions (dépenses/recettes), visualiser son solde, ses historiques et gérer son compte.

---

## Structure du projet

```
MoneyMind/
│
├── controllers/         # Logique métier (authentification, transactions)
│   ├── auth.controller.js
│   └── transaction.controller.js
│
├── middlewares/         # Middlewares Express (authentification JWT)
│   └── auth.middleware.js
│
├── models/              # Modèles de données (utilisateur, transaction)
│   ├── user.model.js
│   └── transaciton.model.js
│
├── routes/              # Définition des routes Express
│   ├── auth.route.js
│   └── transaction.route.js
│
├── public/              # Fichiers statiques (CSS, JS)
│   ├── CSS/
│   └── JS/
│
├── views/               # Vues EJS (pages HTML dynamiques)
│   ├── header.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   └── transactions.ejs
│
├── data.js              # (optionnel) Données ou configuration
├── database.db          # Base de données SQLite
├── package.json         # Dépendances et scripts npm
└── server.js            # Point d’entrée principal du serveur Express
```

---

## Fonctionnalités principales

- **Inscription / Connexion** : Authentification sécurisée avec JWT, stockage du token en cookie HTTPOnly.
- **Transactions** : Ajout, affichage et historique des transactions (dépenses/recettes).
- **Calculs automatiques** : Calcul du solde, total des revenus et dépenses.
- **Sécurité** : Middleware de protection des routes via JWT.
- **Interface utilisateur** : Pages dynamiques avec EJS, design avec Bootstrap.

---

## Fichiers clés

- `server.js` : Initialise Express, configure les middlewares, connecte la base de données, monte les routes.
- `controllers/auth.controller.js` : Gère l’inscription, la connexion, la génération et la vérification des tokens JWT.
- `controllers/transaction.controller.js` : Gère la logique des transactions (CRUD).
- `middlewares/auth.middleware.js` : Vérifie la présence et la validité du token JWT pour sécuriser les routes.
- `models/user.model.js` et `models/transaciton.model.js` : Définissent les méthodes d’accès aux données utilisateurs et transactions.
- `routes/auth.route.js` et `routes/transaction.route.js` : Définissent les endpoints pour l’authentification et les transactions.
- `views/` : Contient les templates EJS pour l’interface utilisateur.

---

## Lancement du projet

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Configurer les variables d’environnement (fichier `.env`) :
   ```
   JWT_SECRET=une_chaine_secrete
   ```
3. Lancer le serveur :
   ```bash
   node server.js
   ```
4. Accéder à l’application via : `http://localhost:PORT` (le port est défini dans `server.js` ou via une variable d’environnement).

---

## Sécurité

- Les mots de passe sont hashés avec bcrypt.
- Les tokens JWT sont stockés en cookie HTTPOnly.
- Les routes sensibles sont protégées par le middleware d’authentification.

---

## Dépendances principales

- express
- ejs
- jsonwebtoken
- bcrypt
- sqlite3
- dotenv
- cookie-parser
- bootstrap (front-end)

---

## Améliorations possibles

- Ajout de la gestion multi-utilisateurs.
- Ajout de catégories personnalisées.
- Export des transactions (CSV, PDF).
- Notifications ou rappels de budget