const User = require('../models/userModel');
const TokenService = require('../service/token');

// Connexion avec adresse e-mail et mot de passe
exports.loginWithEmailAndPassword = async (req, res) => {
  const { Mail, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Mail, Password } });
    if (user) {
      TokenService.generateAccessToken(Mail)
      TokenService.generateRefreshToken(Mail)
      return res.status(200).json({ message: 'Authentification réussie' });
    } else {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect', error: 2});
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur', error: 1});
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
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cette adresse e-mail', error: 2});
    }
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur par adresse e-mail :', error);
    res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur par adresse e-mail', error: 1});
  }
};
