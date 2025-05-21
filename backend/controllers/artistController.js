const {Artist} = require('../models');

exports.getAllArtists = async(req,res) => {
    try{
        const artists = await Artist.findAll();
        res.status(201).json(artists);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Ошибка при получении исполнителей'})
    }
};
