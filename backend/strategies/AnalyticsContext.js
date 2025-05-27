class AnalyticsContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    async execute(params, db) {
        if (!this.strategy) {
            throw new Error("Не выбрана стратегия");
        }
        return await this.strategy.execute(params, db);
    }
}

module.exports = AnalyticsContext;
