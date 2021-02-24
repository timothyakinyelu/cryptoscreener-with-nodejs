const express = require('express')
const express2 = require('express')
const cron = require('node-cron');
const generateCandleSticks = require('./src/controllers/generate');
const symbols = require('./src/datasets/symbols');
const { PORT, PORT2 } = require('./src/config');
const path = require('path');

const app = express();
const app2 = express2();

const schedule = () => {
    symbols.map((symbol) => {
        cron.schedule('* * * * *', async () => await generateCandleSticks(symbol));
    });
}

const port = PORT;
const port2 = PORT2;
app.listen(port, () => console.log(`${port}`));
app2.listen(port2, () => schedule(symbols));