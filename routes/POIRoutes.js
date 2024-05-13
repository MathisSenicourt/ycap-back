const express = require('express');
const router = express.Router();
const poiController = require('../controllers/POIController');

// Routes pour les POIs
router.post('/', poiController.createPOI);
router.get('/bycity/:cityId', poiController.getAllPOIByCityId);
router.get('/:id', poiController.getPOIById);
router.put('/:id', poiController.updatePOI);
router.delete('/:id', poiController.deletePOI);

module.exports = router;
