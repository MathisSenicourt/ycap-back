const POI = require('../models').POI;

// Méthode pour créer un nouveau POI
exports.createPOI = async (req, res) => {
  try {
    const { CityId, Name, Latitude, Longitude, Description } = req.body;
    const newPOI = await POI.create({
      CityId,
      Name,
      Latitude,
      Longitude,
      Description
    });

    if (typeof Latitude !== 'number' || typeof Longitude !== 'number') {
        return res.status(400).json({ message: 'Les valeurs de Latitude et Longitude doivent être des nombres', error: 2 });
    }

    if (typeof Name !== 'string') {
        return res.status(400).json({ message: 'La valeur de Name doit être une chaîne de caractères', error: 2 });
    }

    if (typeof Description !== 'string') {
        return res.status(400).json({ message: 'La valeur de Description doit être une chaîne de caractères', error: 2 });
    }


    res.status(201).json(newPOI);
  } catch (error) {
    console.error('Erreur lors de la création du POI :', error);
    res.status(500).json({ message: 'Erreur lors de la création du POI', error: 1});
  }
};

// Méthode pour obtenir tous les POIs d'une ville donnée
exports.getAllPOIByCityId = async (req, res) => {
  const { cityId } = req.params;
  try {
    const pois = await POI.findAll({ where: { CityId: cityId } });
    res.status(200).json(pois);
  } catch (error) {
    console.error('Erreur lors de la récupération des POI :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des POI', error: 1});
  }
};

// Méthode pour obtenir un POI par son ID
exports.getPOIById = async (req, res) => {
  const { id } = req.params;
  try {
    const poi = await POI.findByPk(id);
    if (!poi) {
      return res.status(404).json({ message: 'POI non trouvé', error: 2});
    }
    res.status(200).json(poi);
  } catch (error) {
    console.error('Erreur lors de la récupération du POI :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du POI', error: 1});
  }
};

// Méthode pour mettre à jour un POI
exports.updatePOI = async (req, res) => {
  const { id } = req.params;
  try {
    const poi = await POI.findByPk(id);
    if (!poi) {
      return res.status(404).json({ message: 'POI non trouvé', error: 2});
    }

    if (typeof req.body.Latitude !== 'number' || typeof req.body.Longitude !== 'number') {
        return res.status(400).json({ message: 'Les valeurs de Latitude et Longitude doivent être des nombres', error: 2 });
    }

    if (typeof req.body.Name !== 'string') {
        return res.status(400).json({ message: 'La valeur de Name doit être une chaîne de caractères', error: 2 });
    }

    if (typeof req.body.Description !== 'string') {
        return res.status(400).json({ message: 'La valeur de Description doit être une chaîne de caractères', error: 2 });
    }

    await poi.update(req.body);
    res.status(200).json(poi);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du POI :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du POI', error: 1});
  }
};

// Méthode pour supprimer un POI
exports.deletePOI = async (req, res) => {
  const { id } = req.params;
  try {
    const poi = await POI.findByPk(id);
    if (!poi) {
      return res.status(404).json({ message: 'POI non trouvé', error: 2});
    }
    await poi.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Erreur lors de la suppression du POI :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du POI', error: 1});
  }
};
