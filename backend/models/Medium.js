const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Medium = sequelize.define('Medium', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Medium;