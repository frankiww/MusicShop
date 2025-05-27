const AnalyticsStrategy = require('./baseStrategy');
const {Sale, Recording} = require('../models');
const {Op, fn, col, literal} = require('sequelize');

class TotalSalesStrategy extends AnalyticsStrategy{
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
                [literal('SUM("quantity" * "price")'), 'total'],
            ]
        });

        return result;

    }
}

module.exports = TotalSalesStrategy;
