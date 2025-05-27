const AnalyticsContext = require('../strategies/AnalyticsContext');
const TopRecsStrategy = require('../strategies/TopRecsStrategy');
const sequelize = require('../config/database');


// const getTopRecs = async (req, res) => {
//     try{
//         const context = new AnalyticsContext(new TopRecsStrategy());
//         const result = await context.execute(req.query, sequelize);
//         res.json(result);
//     } catch(err){
//         console.error(err);
//         res.status(500);
//     }
// };

const getAnalytics = async (req, res) => {
    try {
        const {strategy, ...params } = req.query;

        if(!strategy){
            return res.status(400).json({message: "Необходимо выбрать стратегию"});
        }

        const context = new AnalyticsContext(strategy);
        const result = await context.execute(params);
        res.json(result);
    } catch(err){
        console.error(err);
        res.status(500);
    }
};



module.exports = {
    getAnalytics
};