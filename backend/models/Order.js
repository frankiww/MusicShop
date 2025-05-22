const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    storeId: {type: DataTypes.INTEGER, allowNull: false},
    recordingId: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.DECIMAL, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
    statusId: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = Order;