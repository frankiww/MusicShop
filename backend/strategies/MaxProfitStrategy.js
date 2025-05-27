const AnalyticsStrategy = require('./baseStrategy');
const {Medium, Recording, Catalog, Store} = require('../models');
const {Op, fn, col, literal} = require('sequelize');

class MaxProfitStrategy extends AnalyticsStrategy{
    async execute(params){
        const {storeId} = params;

        const filter = {}

        if (storeId) filter.storeId = storeId;

        const result = Catalog.findAll({
            where: filter,
            attributes: [
                'recordingId',
                'storeId', 
                [col('Recording.name'), 'recName'],  
                [col('Store.name'), 'storeName'],
                [col('Recording.Medium.name'), 'medium'], 
                [literal('"Catalog"."retail_price" - "Recording"."wholesale_price"'), 'diff'],       
            ],
            include: [
                {
                    model: Recording,
                    attributes: [],
                    include: [
                        {
                            model: Medium,
                            attributes: [],
                        },
                        
                    ],
                },
                {
                    model: Store,
                    attributes: [],
                },
            ],
            order: [[literal('"Catalog"."retail_price" - "Recording"."wholesale_price"'), 'DESC']],
            limit: 1
            
        });

        return result;

    }
}

module.exports = MaxProfitStrategy;
