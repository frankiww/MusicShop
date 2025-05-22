const {Recording, Medium, Artist, Genre, RecordGenre, RecordArtist, Catalog, Store} = require('../models');
const {Op} = require('sequelize');

exports.getAllStores = async (req, res) => {
    try{
        const {name} = req.query;

        const filter = {};
        if (name) {
            filter.name = {[Op.iLike]: `%${name}%`};
        }

        const stores = await Store.findAll({
            where: filter
        });

        res.status(200).json(stores);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении записей'});
    }
};
