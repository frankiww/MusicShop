const AnalyticsStrategy = require('./baseStrategy');
const {Sale, Recording, RecordArtist, Artist} = require('../models');

class TopArtistsStrategy extends AnalyticsStrategy{
    async execute(params){
        const {storeId, startDate, endDate} = params;

        const filter = {}

        if (storeId) filter.storeId = storeId;
        if (startDate&&endDate){
            filter.createdAt = {
                [Op.between] : [new Date(startDate), new Date(endDate)],
            };
        }

        const sales = await Sale.findAll({
            where: filter,
            include: [
                {model: Recording,
                    include: [
                        {model: Artist,
                            through: {attributes: []}
                        }
                    ]
                }
            ]
        });

        const artistSale = []

        sales.forEach(s => {
            const rec = s.Recording;
            if (rec && rec.Artists) {
                rec.Artists.forEach(a => {
                    if (!artistSale[a.id])
                    {
                        artistSale[a.id] ={
                            id: a.id,
                            name: a.name,
                            total: 0
                        };
                    }
                    artistSale[a.id].total += s.quantity;
                });
            }
        });

        const result = Object.values(artistSale).sort((a,b) => b.total - a.total);
        return result;

    }
}

module.exports = TopArtistsStrategy;
