const { DataTypes } = require('sequelize');
const sequelize = require('../service/database');
const POI = require('./POIModel');

const City = sequelize.define('City', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CityName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  Longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  Reach: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Association entre les villes et les POIs
City.hasMany(POI, {
  foreignKey: 'CityId',
  onDelete: 'CASCADE',
  hooks: true
});

module.exports = City;
