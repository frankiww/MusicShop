const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    storeId: {type: DataTypes.INTEGER, allowNull: false},
    recordingId: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = Order;