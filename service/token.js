const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour générer un access token
function generateAccessToken(mail) {
    return jwt.sign({ mail }, process.env.PRIVATE_KEY, { expiresIn: '1h', algorithm: 'RS256' });
}

// Fonction pour générer un refresh token
function generateRefreshToken(mail) {
    return jwt.sign({ mail }, process.env.PRIVATE_KEY, { expiresIn: '14d', algorithm: 'RS256' });
}

// Fonction pour rafraîchir un token
async function refresh(req, res, next) {
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

            const userMail = decoded.mail;

            // Vérifier si l'utilisateur existe dans la base de données
            const user = await querry.query('SELECT * FROM cmsuser WHERE Mail = ?', [userMail]); //TODO METTRE LA QUERRY DANS LE CONTROLLER
            if (!user) {
                return res.status(403).json({ message: 'User not found' });
            }

            // Générer un nouvel access token
            const accessToken = generateAccessToken(userMail);
            // Générer un nouvel refresh token
            const newRefreshToken = generateRefreshToken(userMail);

            return res.json({ accessToken, refreshToken: newRefreshToken });
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refresh
};
