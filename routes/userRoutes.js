const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes pour les users
router.post('/login', userController.loginWithEmailAndPassword);
router.post('/refresh', userController.loginWithEmailOnly);

module.exports = router;
