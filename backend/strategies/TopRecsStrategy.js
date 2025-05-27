const AnalyticsStrategy = require('./baseStrategy');
const {Sale, Recording, Medium} = require('../models');
const {Op, Sequelize} = require('sequelize');

class TopRecsStrategy extends AnalyticsStrategy{
    async execute(params, db){
        const {storeId, startDate, endDate} = params;

        const filter = {}

        if (storeId) filter.storeId = storeId;
        if (startDate&&endDate){
            filter.createdAt = {
                [Op.between] : [new Date(startDate), new Date(endDate)],
            };
        }

        const result = await Sale.findAll({
            attributes: [
                'recordingId',
                [db.fn('SUM', db.col('quantity')), 'total'],
            ],
            where: filter,
            group: ['recordingId', 'Recording.id', 'Recording->Medium.id'],
            order: [[db.literal('total'), 'DESC']],
            limit: 5,
            include: [
                {
                    model: Recording,
                    attributes: ['id', 'name', 'year'],
                    include: [
                        {
                            model: Medium,
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });

        return result.map(r => ({
            id: r.Recording.id,
            name: `${r.Recording.name} (${r.Recording.Medium.name})`,
            year: r.Recording.year,
            totalSold: parseInt(r.get('total')),
        }));

    }
}

module.exports = TopRecsStrategy;