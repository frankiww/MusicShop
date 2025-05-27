const AnalyticsStrategy = require('./baseStrategy');
const {Sale, Recording} = require('../models');
const {Op, fn, col, literal} = require('sequelize');

class SoldQtyStrategy extends AnalyticsStrategy{
    async execute(params){
        const {storeId, startDate, endDate} = params;

        const filter = {}

        if (storeId) filter.storeId = storeId;
        if (startDate&&endDate){
            filter.createdAt = {
                [Op.between] : [new Date(startDate), new Date(endDate)],
            };
        }

        const result = Sale.findAll({
            where: filter,
            attributes: [
                [fn('SUM', col('quantity')), 'total'],
            ]
        });

        return result;

    }
}

module.exports = SoldQtyStrategy;
