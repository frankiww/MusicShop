const TopRecsStrategy = require('./TopRecsStrategy');
const TopArtistsStrategy = require('./TopArtistsStrategy');
const SoldQtyStrategy = require('./SoldQtyStrategy');


class AnalyticsContext {
    constructor(strategyName) {
        this.strategy = this.getStrategyName(strategyName);
    }

    setStrategy(strategyName) {
        this.strategy = this.getStrategyName(strategyName);
    }

    getStrategyName(name){
        switch (name) {
            case 'topRecs':
                return new TopRecsStrategy();
            case 'topArtists':
                return new TopArtistsStrategy();
            case 'soldQty':
                return new SoldQtyStrategy();
            default:
                throw new Error(`Неизвестная стратегия ${name}`);
        }
    }

    async execute(params, db) {
        if (!this.strategy) {
            throw new Error("Не выбрана стратегия");
        }
        return await this.strategy.execute(params, db);
    }
}

module.exports = AnalyticsContext;
