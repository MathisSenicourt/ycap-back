const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const routeur = require("./routes/routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routeur);

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ycap'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données MySQL réussie');
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré à l'adresse http://localhost:${port}`);
});
