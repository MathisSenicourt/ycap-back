const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Routes pour les villes
router.post('/', cityController.createCity);
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.put('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);

module.exports = router;
