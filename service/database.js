const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ycap', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
