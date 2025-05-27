class AnalyticsStrategy {
    async execute(params, db){
        throw new Error("Strategy must implement execute()");
    }
}

module.exports = AnalyticsStrategy;