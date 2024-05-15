const { DataTypes } = require('sequelize');
const sequelize = require('../service/database');

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

// Association entre les villes et les POIs
City.hasMany(POI, {
    foreignKey: 'CityId',
    onDelete: 'CASCADE',
    hooks: true
});

module.exports = {
    City,
    POI,
    CMSUser,
}