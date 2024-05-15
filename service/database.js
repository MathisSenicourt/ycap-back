const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('YCAPDB', 'YCAPDBUSER', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
