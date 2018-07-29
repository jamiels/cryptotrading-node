var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

// 1 level 2


async function run() {    
    // 3 change last arg to true
    // 4 add level 2
    load('https://api.gdax.com/products/eth-usd/book?level=2',getHeaders(),false);


};

function callback(json) {

    // 5
    console.log(json.bids);
    console.log(json.asks);

    // 6
    columns = ['bid','qty','bidders'];
    df = new DataFrame(json.bids,columns);
    df.show(50);

    // 7
    columns = ['ask','qty','askers'];
    df = new DataFrame(json.asks,columns);
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