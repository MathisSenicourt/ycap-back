const User = require('../models').CMSUser;
const TokenService = require('../service/token');
const bcrypt = require('bcrypt');

// Enregistrement crypté avec user et mot de passe
exports.registerUser = async (req, res) => {
    const { Mail, Password } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { Mail } });
      if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur déjà existant', error : 1 });
      }
  
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      await User.create({ Mail, Password: hashedPassword });
  
      return res.status(201).json({ message: 'Enregistrement réussi' });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement: ", error);
      return res.status(500).json({ message: "Erreur lors de l'enregistrement", error : 2 });
    }
  };

  
// Connexion avec adresse e-mail et mot de passe
exports.loginWithEmailAndPassword = async (req, res) => {
    const {Mail, Password} = req.body;
    let newRefreshToken;
    let newAccessToken;
    try {
        const user = await User.findOne({where: {Mail}});
        if (user) {
            const match = await bcrypt.compare(Password, user.Password);
            if (match) {
                newAccessToken = TokenService.generateAccessToken(Mail)
                newRefreshToken = TokenService.generateRefreshToken(Mail)

                return res.status(200).json({
                    message: 'Authentification réussie', accessToken: newAccessToken, refreshToken: newRefreshToken
                });
            }else{
                return res.status(401).json({message: 'Adresse e-mail ou mot de passe incorrect', error: 2});
            }
        } else {
            return res.status(401).json({message: 'Adresse e-mail ou mot de passe incorrect', error: 2});
        }
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur :', error);
        res.status(500).json({message: 'Erreur lors de la connexion de l\'utilisateur', error: 1});
    }
};

// Connexion avec adresse e-mail uniquement
exports.refreshToken = async (req, res) => {
  console.log(req.headers['refresh-token'])
  let newRefreshToken;
  let newAccessToken;
  try {
    const Mail = await TokenService.getMailFromVerifiedRefreshToken(req, res);
    const user = await User.findOne({where: {Mail}});
    if (user) {
        newAccessToken = TokenService.generateAccessToken(Mail)
        newRefreshToken = TokenService.generateRefreshToken(Mail)
        return res.status(200).json({
            message: 'Utilisateur trouvé avec l\'adresse e-mail',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } else {
        return res.status(404).json({message: 'Aucun utilisateur trouvé avec cette adresse e-mail', error: 2});
    }
  } catch (error) {
      console.error('Erreur lors de la recherche de l\'utilisateur par adresse e-mail :', error);
      res.status(500).json({message: 'Erreur lors de la recherche de l\'utilisateur par adresse e-mail', error: 1});
  }
};