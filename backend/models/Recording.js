const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Recording = sequelize.define('Recording', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    mediumId: {type: DataTypes.INTEGER, allowNull: false},
    year: {type: DataTypes.STRING, allowNull: false},
});

module.exports = Recording;