const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Store;