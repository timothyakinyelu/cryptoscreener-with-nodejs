const Binance = require('node-binance-api');
const { API_KEY, SECRET_KEY } = require('../config');
const runIndicators = require('./indicators');
const path = require('path');

const binance = new Binance().options({
    APIKEY: API_KEY,
    APISECRET: SECRET_KEY,
    recvWindow: 180000
});

let folder = path.join('./src', 'datasets', 'cache');

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const middleFunction = async (error, ticks, symbol) => {
    // if(err === 'Error: getaddrinfo ENOTFOUND api.binance.com') {
    //     // await generateCandleSticks(symbol);
    //     console.log(error);
    // }

    if (!isEmpty(ticks)) {
        let result = await runIndicators(symbol, ticks);
        // indicatorFile = path.join(folder, `${symbol}_file.json`)
        
        console.log(result);
    }
}

let symbols = [];

let wait = delay => new Promise(resolve => {
    let timer = setTimeout(function request() {
        resolve();
        if (delay === 40000) {
            clearTimeout(timer)
        }
    })
    
});

const retryFunction = async (error, symbol) => { 
    const ENOTFOUND = 'ENOTFOUND';
    const ECONNRESET = 'ECONNRESET';
    const SSLERROR = 'ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC';

    if (error) {
        if (error['code'] === ENOTFOUND || error['code'] === ECONNRESET || error['code'] === SSLERROR) {
            symbols.push(symbol)
            let delay = 2000;
            if (symbols.includes(symbol)) {
                delay *= 5;
            }
            await wait(delay);
            await generateCandleSticks(symbol);
        }
    }
}

const generateCandleSticks = async (job) => {
    const currentDate = new Date();
    startVal = currentDate - 24 * 3600 * 1000
    endVal = currentDate.getTime();
    // let tickers = await binance.prices();
    // console.log(ticker)

    try {
        await binance.candlesticks(job, "30m", (error, ticks, symbol) => {
            if (error) {
                return retryFunction(error, symbol)
            }
            return middleFunction(error, ticks, symbol);
        }, { startTime: startVal, endTime: endVal })
    } catch(err) {
        console.log(err);
    }
};

module.exports = generateCandleSticks;