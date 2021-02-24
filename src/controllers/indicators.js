const talib = require('talib-binding');
const Binance = require('node-binance-api');
const { API_KEY, SECRET_KEY } = require('../config');

const runIndicators = async (symbol, ticks, currentPrice) => {
    let openPrice = [];
    let highPrice = [];
    let lowPrice = [];
    let closePrice = [];
    let volume = [];

    ticks.map(tick => {
        openPrice.push(parseFloat(tick[1]));
        highPrice.push(parseFloat(tick[2]));
        lowPrice.push(parseFloat(tick[3]));
        closePrice.push(parseFloat(tick[4]));
        volume.push(parseFloat(tick[5]));
    });

    var marketData = { open: openPrice, high: highPrice, low: lowPrice, close: closePrice, volume: volume };
    
    var rsi = talib.RSI(inReal=marketData.close);
    var sma = talib.SMA(inReal=marketData.close);
    var atr = talib.ATR(inHigh=marketData.high, inLow=marketData.low, inClose=marketData.close);
    var natr = talib.NATR(inHigh=marketData.high, inLow=marketData.low, inClose=marketData.close);
    var adx = talib.ADX(inHigh=marketData.high, inLow=marketData.low, inClose=marketData.close);
    var mfi = talib.MFI(inHigh=marketData.high, inLow=marketData.low, inClose=marketData.close, inVolume=marketData.volume);
    var ppo = talib.PPO(inReal=marketData.close, optFast_Period=12, optSlow_Period=26, optMA_Type=0);
    var resSTOCH = talib.STOCH(inHigh=marketData.high, inLow=marketData.low, inClose=marketData.close, optFastK_Period=14, optSlowK_Period=3, optSlowD_Period=3);
    var resMACD = talib.MACD(inReal=marketData.close, optFast_Period=12, optSlow_Period=26, optSignal_Period=9);


    // get ticker current price
    // const binance = new Binance().options({
    //     APIKEY: API_KEY,
    //     APISECRET: SECRET_KEY,
    //     recvWindow: 180000
    // });

    // create crypto object
    crypto = {}

    crypto['ticker'] = symbol
    crypto['price'] = closePrice[closePrice.length - 1]
    crypto['SMA14'] = sma[sma.length - 1]
    crypto['ATR'] = atr[atr.length - 1]
    crypto['NATR'] = natr[natr.length - 1]
    crypto['ADX'] = adx[adx.length - 1]
    crypto['MFI'] = mfi[mfi.length - 1]
    crypto['RSI'] = rsi[rsi.length - 1]
    crypto['STO'] = resSTOCH[0][resSTOCH[0].length - 1], resSTOCH[1][resSTOCH[1].length - 1]
    crypto['MACD'] = resMACD[0][resMACD[0].length - 1]
    crypto['PPO'] = ppo[ppo.length - 1]

    return crypto;
};

module.exports = runIndicators;