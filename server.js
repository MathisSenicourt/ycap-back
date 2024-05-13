require('dotenv').config();

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routeur = require("./routes/route");

const app = express();
const port = 3000

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routeur)

//Connexion à la database
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//Démarrage du serveur
app.listen(port, () => {
    console.log(`Server started at https://localhost:${port}`)
})