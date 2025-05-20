const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Catalog = sequelize.define('Catalog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    storeId: {type: DataTypes.INTEGER, allowNull: false},
    recordingId: {type: DataTypes.INTEGER, allowNull: false},
    retail_price: {type: DataTypes.DECIMAL, allowNull: false},
    wholesale_price: {type: DataTypes.DECIMAL, allowNull: false},
    stock: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = Catalog;