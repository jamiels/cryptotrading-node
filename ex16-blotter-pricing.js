var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

async function run() {    
    
    blotter = initializeBlotter(); 
    // get new async price
    price = await getPrice('eth-usd');
    trade = [new Date(),'eth',1.3,price.ask];
    blotter = blotter.push(trade);
    blotter.show();
};

// 2 get price function
async function getPrice(crypto) {
    url = 'https://api.gdax.com/products/'+crypto+'/book';
    prices = await load(url,getHeaders(),false);
    console.log(prices);
    bid = prices.bids[0][0];
    ask = prices.asks[0][0];
    bidask = {'bid':bid,'ask':ask};
    return bidask;
}

function initializeBlotter() {
    blotter = new DataFrame([],['Timestamp','Crypto','Qty','Price']);
    return blotter;
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