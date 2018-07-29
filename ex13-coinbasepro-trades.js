var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
var plotly = require('plotly')('jamielsheikh', 'VNBx3ByJnTptdjg2d0Pc');

async function run() {    

    // 1
    load('https://api.gdax.com/products/eth-usd/trades',getHeaders(),false);
};

function callback(json) {

    /*

    The trade side indicates the maker order side. The maker order is the order that was open on the order book. 
    buy side indicates a down-tick because the maker was a buy order and their order was removed. Conversely, sell side indicates an up-tick.
    sell = ask was hit, uptick
    buy = bid was hit, downtick
    */

    // 2
    df = new DataFrame(json);
    df.show(50);

    // 3
    df = df.restructure(['time', 'price', 'size'])
    df.show(50); 
}

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

function getHeaders() {
    return {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'};
}

run();