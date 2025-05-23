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
            where: filter,
            include: [{
                model: Catalog,
                attributes: ['stock'],
            }],
        });

        const result = stores.map(store => {
            const recordings = store.Catalogs || [];
            const total = recordings.reduce((sum,r ) => sum + (r.stock ||0), 0);
            return {
                id: store.id,
                name: store.name,
                unique: recordings.length,
                total: total,
            };
        })

        res.status(200).json(result);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении записей'});
    }
};

exports.getStoreById = async(req, res) =>{
    try{
        const { id } = req.params;

        const store = await Store.findByPk(id, {
            include: [{
                model: Catalog,
                attributes: ['stock'],
            }],
        });

        if (!store) {
            return res.status(404).json({ error: 'Магазин не найден' });
        }
        const recordings = store.Catalogs || [];
        const total = recordings.reduce((sum,r ) => sum + (r.stock ||0), 0);

        const result = {
            id: store.id,
            name: store.name,
            unique: recordings.length,
            total: total,
        };
        res.status(200).json(result);

    } catch (err){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении записи'});
    }

};
