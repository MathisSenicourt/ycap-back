    const express = require("express");
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const sequelize = require('./service/database');
    const cityRouteur = require("./routes/cityRoutes");
    const POIRouteur = require("./routes/POIRoutes");

    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/cities', cityRouteur);
    app.use('/pois', POIRouteur);

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
