var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

async function run() {    
    
    pairs = ['eth-usd','btc-usd'];
    blotter = initializeBlotter(); 
    pl = initializePL(pairs);

    //blotter = await trade(blotter,100,pairs[0]);
    //blotter = await trade(blotter,-100,pairs[0]);
    //blotter = await trade(blotter,110,pairs[1]);
    //blotter = await trade(blotter,120,pairs[1]);
    //blotter.show();

    console.log('Buy 100 shares @ $1, add 50 shares @ $1, VWAP: $',calc_vwap(100,1,50,1));
    console.log('Buy 100 shares @ $1, add 100 shares @ $2, VWAP: $',calc_vwap(100,1,100,2));
    console.log('Buy 100 shares @ $1, add 1 shares @ $100, VWAP: $',calc_vwap(100,1,1,100));
};

function calc_vwap(current_qty,current_vwap,qty,price) {
    current_dollar = current_qty * current_vwap;
    new_dollar = current_dollar + (qty * price);
    new_qty = current_qty + qty;
    new_vwap = new_dollar / new_qty;
    return new_vwap;
}


// 2
async function trade(blotter,qty,crypto) {
    quote = await getPrice(crypto);
    if (qty>0) {
        price = quote.ask;
    } else {
        price = quote.bid;
    }

    blotter = blotter.push([new Date(),crypto,qty,price]);
    return blotter;
}


function initializeBlotter() {
    return new DataFrame([],['Timestamp','Crypto','Qty','Price']);
}

function initializePL(cryptos) {
    pl = new DataFrame([],['Crypto','Position','VWAP','UPL','RPL']);
    for (c in cryptos) {
        pl = pl.push([cryptos[c],0,0,0,0]);
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
    //console.log(prices); // remove
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