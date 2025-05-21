const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const RecordArtist = sequelize.define('RecordArtist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    recordingId: {type: DataTypes.INTEGER, allowNull: false},
    artistId: {type: DataTypes.INTEGER, allowNull: false},
});

module.exports = RecordArtist;