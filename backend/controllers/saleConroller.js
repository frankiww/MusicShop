const {Sale, Store, Recording, Medium} = require('../models');
const {Op, fn, col, literal} = require('sequelize');

exports.getAllSales = async (req, res) => {
    try{

        const {storeId, startDate, endDate} = req.query;
        const filter = {}

        if (storeId) filter.storeId = storeId;
        if (startDate&&endDate){
            filter.createdAt = {
                [Op.between] : [new Date(startDate), new Date(endDate)],
            };
        }

        const sales = await Sale.findAll(
            {
                where: filter,
                include: [
                    { 
                        model: Store,
                        attributes: ['name']
                    },
                    {
                        model: Recording,
                        attributes: ['name'],
                        include: [{
                            model: Medium,
                            attributes: ['name']
                        }]
                    },

                ]
            }
        );

        res.status(200).json(sales);
    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Ошибка при получении заказов'});
    }
};