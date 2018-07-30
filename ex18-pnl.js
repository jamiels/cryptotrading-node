var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

async function run() {    
    
    pairs = ['eth-usd','btc-usd'];
    blotter = initializeBlotter(); 
    pl = initializePL(pairs);
    pl.show();
};


function initializeBlotter() {
    return new DataFrame([],['Timestamp','Crypto','Qty','Price']);
}

function initializePL(pairs) {
    pl = new DataFrame([],['Pairs','Position','VWAP','UPL','RPL']);
    for (p in pairs) {
        pl = pl.push([pairs[p],0,0,0,0]);
    }
    return pl;
}

async function load(url,headers,printout) {
    // 1 wrap with a promise and clean out callback
    return new Promise(function (resolve,reject) {
        request({headers:{'User-Agent': headers},
                uri:url}, 
                async (error, response, body) => {
                    json = JSON.parse(body);
                    if(printout)
                        console.log(json); 
                    resolve(json);
        });
    });
}

async function getPrice(crypto) {
    url = 'https://api.gdax.com/products/'+crypto+'/book';
    prices = await load(url,getHeaders(),false);
    console.log(prices);
    bid = prices.bids[0][0];
    ask = prices.asks[0][0];
    bidask = {'bid':bid,'ask':ask};
    return bidask;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

function getHeaders() {
    return {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'};
}

run();