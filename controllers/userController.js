const User = require('../models/userModel');

// Connexion avec adresse e-mail et mot de passe
exports.loginWithEmailAndPassword = async (req, res) => {
  const { Mail, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Mail, Password } });
    if (user) {
      // Authentification réussie
      return res.status(200).json({ message: 'Authentification réussie' });
    } else {
      // Informations d'identification incorrectes
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
  }
};

// Connexion avec adresse e-mail uniquement
exports.loginWithEmailOnly = async (req, res) => {
  const { Mail } = req.body;
  try {
    const user = await User.findOne({ where: { Mail } });
    if (user) {
      // Utilisateur trouvé avec l'adresse e-mail
      return res.status(200).json({ message: 'Utilisateur trouvé avec l\'adresse e-mail' });
    } else {
      // Aucun utilisateur trouvé avec cette adresse e-mail
      return res.status(404).json({ message: 'Aucun utilisateur trouvé avec cette adresse e-mail' });
    }
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur par adresse e-mail :', error);
    res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur par adresse e-mail' });
  }
};
