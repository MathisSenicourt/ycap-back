const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour générer un access token
function generateAccessToken(mail) {
    return jwt.sign({ mail }, process.env.PRIVATE_KEY, { expiresIn: '1h', algorithm: 'HS256' });
}

// Fonction pour générer un refresh token
function generateRefreshToken(mail) {
    return jwt.sign({ mail }, process.env.PRIVATE_KEY, { expiresIn: '14d', algorithm: 'HS256' });
}

// Fonction pour rafraîchir un token
async function verifyRefreshToken(req, res) {
    try {
        const refreshToken = req.headers['refresh-token'];

        // Vérifier si le refresh token est présent dans l'en-tête de la requête
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token missing' });
        }

        // Vérifier si le refresh token est valide
        jwt.verify(refreshToken, process.env.PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            return decoded.mail;
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la verification du refresh token' });
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
};
