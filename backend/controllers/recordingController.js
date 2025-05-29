const {Recording, Medium, Artist, Genre, RecordGenre, RecordArtist, Catalog, Store} = require('../models');
const {Op} = require('sequelize');

exports.getAllRecordings = async (req, res) => {
    try{
        const {title, artistId, genreId, mediumId} = req.query;

        const filter = {};
        if (title) {
            filter.name = {[Op.iLike]: `%${title}%`};
        }
        if (mediumId){
            filter.mediumId = mediumId;
        }

        const recordings = await Recording.findAll({
            where: filter,
            include: [
                {model: Medium},
                {
                    model: Artist,
                    through: {attributes: []},
                    where: artistId ? {id:artistId}: undefined,
                    required: !!artistId
                },
                {
                    model: Genre,
                    through: {attributes: []},
                    where: genreId ? {id:genreId}: undefined,
                    required: !!genreId
                },
            ]
        });

        res.status(200).json(recordings);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении записей'});
    }
};


exports.getRecordingById = async (req, res) => {
    try {
        const id = req.params.id;
        const recording = await Recording.findOne({where: {id},
            include: [
                {model: Medium},
                {
                    model: Artist,
                    through: {attributes: []},
                },
                {
                    model: Genre,
                    through: {attributes: []},
                },
            ]});

        if (!recording) {
            return res.status(404).json({ message: 'Запись не найдена' });
        }

        res.json(recording);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
  };

  exports.availableShops = async (req, res) => {
    try {
        const recordingId = req.params.id;
        const catalogs = await Catalog.findAll({
            where: {
                recordingId,
                stock: {[Op.gt]: 0}
            },
            include: [{model:Store}]

        });

        res.json(catalogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
  };

  exports.unavailableShops = async (req, res) => {
    try {
        const recordingId = req.params.id;
        const allStores = await Store.findAll();

        const storesWith = await Catalog.findAll({
            where: {
                recordingId,
                stock: {[Op.gt]: 0}
            },
            attributes: ['storeId']
        });

        const ids = storesWith.map(c => c.storeId);

        const storesWithout = allStores.filter(s => !ids.includes(s.id));

        const stores = storesWithout.map(s => ({
            Store: s,
            catalog: null
        }));


        res.json(stores);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
  };

  exports.getRecordingsByStore = async (req, res) => {
    try{
        const {title, artistId, genreId, mediumId, storeId} = req.query;

        const filter = {};
        if (title) {
            filter.name = {[Op.iLike]: `%${title}%`};
        }
        if (mediumId){
            filter.mediumId = mediumId;
        }

        const recordings = await Recording.findAll({
            where: filter,
            include: [
                {model: Medium},
                {
                    model: Artist,
                    through: {attributes: []},
                    where: artistId ? {id:artistId}: undefined,
                    required: !!artistId
                },
                {
                    model: Genre,
                    through: {attributes: []},
                    where: genreId ? {id:genreId}: undefined,
                    required: !!genreId
                },
                {
                    model: Catalog,
                    where: {storeId},
                    attributes: ['stock', 'retail_price'],
                    required: true
                },
            ]
        });

        res.status(200).json(recordings);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении записей'});
    }
};

exports.getRecordingsNotInStore = async (req, res) => {
    try{
        const {title, artistId, genreId, mediumId, storeId} = req.query;

        const filter = {};
        if (title) {
            filter.name = {[Op.iLike]: `%${title}%`};
        }
        if (mediumId){
            filter.mediumId = mediumId;
        }
        
        const recsInStore = await Catalog.findAll({
            where: {storeId},
            attributes: ['recordingId'],
        });
        const ids = recsInStore.map(item => item.recordingId);

        const recordings = await Recording.findAll({
            where: {
                ...filter,
                id: { [Op.notIn]: ids.length > 0 ? ids : [0]}
            },
            include: [
                {model: Medium},
                {
                    model: Artist,
                    through: {attributes: []},
                    where: artistId ? {id:artistId}: undefined,
                    required: !!artistId
                },
                {
                    model: Genre,
                    through: {attributes: []},
                    where: genreId ? {id:genreId}: undefined,
                    required: !!genreId
                },

            ]
        });

        res.status(200).json(recordings);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении записей'});
    }
};

exports.deleteRecording = async (req, res) => {
    try {
        const {id} = req.params;
        const rec = await Recording.findByPk(id);

        if(!rec) {
            return res.status(404).json({message: 'запись не найдена'});
        }

        await rec.destroy();
        res.status(204).send();
    } catch(err){
        res.status(500).json({error: 'Ошибка при удалении записи'});
    }
};
  
  