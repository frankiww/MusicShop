const {Genre} = require('../models');

exports.getAllGenres = async(req,res) => {
    try{
        const genres = await Genre.findAll();
        res.status(201).json(genres);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Ошибка при получении жанров'})
    }
};
