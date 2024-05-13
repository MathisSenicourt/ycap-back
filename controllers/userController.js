const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const TokenService = require('../service/token');

// Fonction pour générer un token JWT d'access
function generateAccessToken(user) {
  const payload = {
    id: user.ID,
    mail: user.Mail
    // Ajoutez d'autres informations de l'utilisateur que vous souhaitez inclure dans le token
  };
  const options = {
    expiresIn: '1h' // Durée de validité de l'access token (ici 1 heure)
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, options);
}

// Fonction pour générer un token JWT de refresh
function generateRefreshToken(user) {
  const payload = {
    id: user.ID,
    mail: user.Mail
    // Ajoutez d'autres informations de l'utilisateur que vous souhaitez inclure dans le token
  };
  const options = {
    expiresIn: '7d' // Durée de validité du refresh token (ici 7 jours)
  };
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, options);
}

// Connexion avec adresse e-mail et mot de passe et génération d'access token
exports.loginWithEmailAndPassword = async (req, res) => {
  const { Mail, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Mail, Password } });
    if (user) {
      const accessToken = generateAccessToken(user); // Générer un access token JWT
      TokenService.generateAccessToken(Mail)
      TokenService.generateRefreshToken(Mail)
      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect', error: 2 });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur', error: 1 });
  }
};

// Connexion avec adresse e-mail uniquement
exports.refreshToken = async (req, res) => {
  const { Mail } = TokenService.verifyRefreshToken(req, res);
  try {
    const user = await User.findOne({ where: { Mail } });
    if (user) {
      TokenService.generateAccessToken(Mail)
      TokenService.generateRefreshToken(Mail)
      return res.status(200).json({ message: 'Utilisateur trouvé avec l\'adresse e-mail' });
    } else {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cette adresse e-mail', error: 2 });
    }
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur par adresse e-mail :', error);
    res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur par adresse e-mail', error: 1 });
  }
};
