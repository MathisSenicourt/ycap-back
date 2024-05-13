const User = require('../models/userModel');
const TokenService = require('../service/token');

// Connexion avec adresse e-mail et mot de passe
exports.loginWithEmailAndPassword = async (req, res) => {
    const {Mail, Password} = req.body;
    let newRefreshToken;
    let newAccessToken;
    try {
        const user = await User.findOne({where: {Mail, Password}});
        if (user) {
            newAccessToken = TokenService.generateAccessToken(Mail)
            newRefreshToken = TokenService.generateRefreshToken(Mail)

            return res.status(200).json({
                message: 'Authentification réussie', accessToken: newAccessToken, refreshToken: newRefreshToken
            });
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
    const {Mail} = TokenService.verifyRefreshToken(req, res);
    let newRefreshToken;
    let newAccessToken;
    try {
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
