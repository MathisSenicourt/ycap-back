const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour générer un access token
function generateAccessToken(mail) {
    return jwt.sign({ mail }, process.env.PRIVATE_ACCES_KEY, { expiresIn: '2d', algorithm: 'HS256' });
}

// Fonction pour générer un refresh token
function generateRefreshToken(mail) {
    return jwt.sign({ mail }, process.env.PRIVATE_REFRESH_KEY, { expiresIn: '30d', algorithm: 'HS256' });
}

// Fonction pour rafraîchir un token
async function getMailFromVerifiedRefreshToken(req, res) {
    try {
        const refreshToken = req.headers['refresh-token'];

        // Vérifier si le refresh token est présent dans l'en-tête de la requête
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token missing' });
        }

        // Vérifier si le refresh token est valide
        const decoded = jwt.verify(refreshToken, process.env.PRIVATE_REFRESH_KEY);
        console.log("decoded " + decoded);

        return decoded.mail;
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la verification du refresh token' });
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    getMailFromVerifiedRefreshToken
};
