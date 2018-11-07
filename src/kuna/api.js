const fetch = require('node-fetch');

// Base fetch method
const _baseFetch = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('baseFetch(): Something went wrong :(');
    }
}

// https://kuna.io/api/v2/timestamp
// 1465845534 — часова мітка в юнікс-форматі
const timestamp = () => {
    return _baseFetch('https://kuna.io/api/v2/timestamp');
}

// https://kuna.io/api/v2/tickers/btcuah
// {
//     "at": час на сервері,
//     "ticker": {
//         "buy": ціна біткоіну на покупку,
//         "sell": ціна біткоіну на продаж,
//         "low": найменьша ціна операції за 24 години,
//         "high": найбильша ціна операції за 24 години,
//         "last": цина останньої операції,
//         "vol": об'єм торгів в базовій валюті за 24 години,
//         "amount": загальна вартість торгів за 24 години
//     }
// }
const market = async (pair) => {
    pair = pair != undefined ? pair : '';
    return _baseFetch(`https://kuna.io/api/v2/tickers/${pair}`);
};

// https://kuna.io/api/v2/depth?market=btcuah
// {
//     "timestamp": server time
//     "asks": array of orders for sale
//     [
//         [price, volume]
//     ],
//     "bids": array of orders for buy
//     [
//         [price, volume]
//     ]
// }
const order_book = (pair) => {
    pair = pair != undefined ? pair : '';
    return _baseFetch(`https://kuna.io/api/v2/depth?market=${pair}`);
};

// https://kuna.io/api/v2/trades?market=btcuah
// [{
//     "id": trade ID,
//     "price": price for 1 BTC,
//     "volume": volume in BTC,
//     "funds": volume in UAH,
//     "market": market ID,
//     "created_at": the time of trade,
//     "side": always null
// }]
const trade_hist = (pair) => {
    pair = pair != undefined ? pair : '';
    return _baseFetch(`https://kuna.io/api/v2/trades?market=${pair}`);
};


module.exports = {
    timestamp,
    market,
    order_book,
    trade_hist
};

// Hot to call
// (async () => {

//     let market = await kuna.market('btcuah');
//     console.log('market: ', market);

// })();