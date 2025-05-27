const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Sale = sequelize.define('Sale', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    storeId: {type: DataTypes.INTEGER, allowNull: false},
    recordingId: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
});

module.exports = Sale;