const { DataTypes } = require('sequelize');
const sequelize = require('../service/database');
const City = require('./cityModel');

const POI = sequelize.define('POI', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: City,
      key: 'ID'
    }
  },
  Name: {
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
  Description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = POI;
