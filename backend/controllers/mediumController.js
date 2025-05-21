const {Medium} = require('../models');

exports.getAllMediums = async(req,res) => {
    try{
        const mediums = await Medium.findAll();
        res.status(201).json(mediums);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'Ошибка при получении носителей'})
    }
};
