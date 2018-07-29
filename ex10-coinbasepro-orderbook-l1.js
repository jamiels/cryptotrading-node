var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

// 1 understanding what is an order book, what is matching
// 2 levels 1, 2, 3

async function run() {    
    // 3 change last arg to true
    // 4 change last arge to false
    // coinbase pro requires key, we can bypass
    load('https://api.gdax.com/products/eth-usd/book',getHeaders(),false);

    // 9
    load('https://api.gdax.com/products/btc-usd/book',getHeaders(),false);
};

function callback(json) {

    // 5
    console.log(json.bids);
    console.log(json.asks);

    // 6
    console.log(json.bids[0][0]);
    console.log(json.asks[0][0]);
    
    // 7
    console.log('Best bid',json.bids[0][0],' with qty available ',json.bids[0][1]);
    console.log('Best ask',json.asks[0][0],' with qty available ',json.asks[0][1]);
    
    // 8 - what if spread is neg?
    console.log('Spread',json.asks[0][0] - json.bids[0][0]);
}

// 2 - add printout
function load(url,headers,printout) {
    var json;
    request({headers:{'User-Agent': headers},
            uri:url}, 
            async (error, response, body) => {      
                json = JSON.parse(body);
                if(printout)
                    console.log(json);
                callback(json);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

// 2
function getHeaders() {
    return {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'};
}

run();