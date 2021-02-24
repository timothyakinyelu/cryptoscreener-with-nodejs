var config = {
    PORT: process.env.PORT,
    PORT2: process.env.PORT2,
    DEBUG: true,
    API_KEY: process.env.BINANCE_API_KEY,
    SECRET_KEY: process.env.BINANCE_SECRET_KEY,
    APP_KEY: process.env.SECRET_KEY
}

// override default config based on environment
switch (process.env.NODE_ENV) {
    case 'production':
        config.DEBUG = false
        break;
    case 'staging':
        config.DEBUG = false
    default:
        break;
};

module.exports = config;