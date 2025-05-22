const {Recording, Medium, Artist, Genre, RecordGenre, RecordArtist} = require('../models');
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