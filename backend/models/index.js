const Artist = require('./Artist');
const Genre = require('./Genre');
const Medium = require('./Medium');
const Recording = require('./Recording');
const Store = require('./Store');
const Catalog = require('./Catalog');
const Sale = require('./Sale');
const Status = require('./Status');
const Order = require('./Order');
const RecordGenre = require('./RecordGenre');
const RecordArtist = require('./RecordArtist');

Recording.belongsToMany(Genre, {through: RecordGenre, foreignKey: 'recordingId'});
Genre.belongsToMany(Recording, {through: RecordGenre, foreignKey: 'genreId'});

Recording.belongsToMany(Artist, {through: RecordArtist, foreignKey: 'recordingId'});
Artist.belongsToMany(Recording, {through: RecordArtist, foreignKey: 'artistId'});

Medium.hasMany(Recording, {foreignKey: 'mediumId', onDelete: 'CASCADE'});
Recording.belongsTo(Medium, {foreignKey: 'mediumId'});

Status.hasMany(Order, {foreignKey: 'statusId', onDelete: 'SET NULL'});
Order.belongsTo(Status, {foreignKey: 'statusId'});

Recording.belongsToMany(Store, { through: Catalog, foreignKey: 'recordingId' });
Store.belongsToMany(Recording, { through: Catalog, foreignKey: 'storeId' });
Catalog.belongsTo(Store, { foreignKey: 'storeId' });
Catalog.belongsTo(Recording, { foreignKey: 'recordingId' });


Order.belongsTo(Recording, { foreignKey: 'recordingId' });
Order.belongsTo(Store, { foreignKey: 'storeId' });
Recording.hasMany(Order, { foreignKey: 'recordingId' });
Store.hasMany(Order, { foreignKey: 'storeId' });

Sale.belongsTo(Recording, { foreignKey: 'recordingId' });
Sale.belongsTo(Store, { foreignKey: 'storeId' });
Recording.hasMany(Sale, { foreignKey: 'recordingId' });
Store.hasMany(Sale, { foreignKey: 'storeId' });

module.exports = {
    Artist, Genre, Medium, Recording,
    Store, Catalog, Sale, Status, Order,
    RecordArtist, RecordGenre
};


