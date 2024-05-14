const express = require("express");
const cors = require('cors');
import { rateLimit } from 'express-rate-limit'
const bodyParser = require('body-parser');

require('dotenv').config();

const { expressjwt: jwt } = require("express-jwt");
const privateAccesKey = process.env.PRIVATE_ACCES_KEY;

const sequelize = require('./service/database');
const cityRouteur = require("./routes/cityRoutes");
const POIRouteur = require("./routes/POIRoutes");
const UserRouteur = require("./routes/userRoutes");

const app = express();
const port = 3000;

// Limiter le nombre de requêtes par IP
app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 20, // Limit each IP to 20 requests per `window` (here, per 1 minute).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
}));

// Utilisez CORS comme middleware
app.use(cors({
    // origin: 'http://localhost:3000',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Middleware for JWT authentication
app.use(
  jwt({
      secret: privateAccesKey,
      algorithms: ["HS256"],
  }).unless({
      path: [
          {url: /^\/.*/, methods: ['GET']},
          {url: "/user/login",},
          {url: "/user/refresh"}
      ]
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/cities', cityRouteur);
app.use('/pois', POIRouteur);
app.use('/user', UserRouteur);

// Connexion à la base de données MySQL avec Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données MySQL réussie');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

// Importation des modèles
const City = require('./models/cityModel');
const POI = require('./models/POIModel');

// Synchronisation des modèles avec la base de données (création des tables si elles n'existent pas)
sequelize.sync()
  .then(() => {
    console.log('Modèles synchronisés avec la base de données');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation des modèles :', err);
  });

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré à l'adresse http://localhost:${port}`);
});
