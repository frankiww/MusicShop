const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const RecordGenre = sequelize.define('RecordGenre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    recordingId: {type: DataTypes.INTEGER, allowNull: false},
    genreId: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = RecordGenre;