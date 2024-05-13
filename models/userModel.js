const { DataTypes } = require('sequelize');
const sequelize = require('../service/database');

const CMSUser = sequelize.define('CMSUser', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = CMSUser;
