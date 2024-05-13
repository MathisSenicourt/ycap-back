const express = require('express');
const router = express.Router();
const poiController = require('../controllers/POIController');

// Routes pour les points d'intérêt (POI)
router.post('/', poiController.createPOI);
router.get('/:cityId', poiController.getAllPOIByCityId);
router.get('/:id', poiController.getPOIById);
router.put('/:id', poiController.updatePOI);
router.delete('/:id', poiController.deletePOI);

module.exports = router;
