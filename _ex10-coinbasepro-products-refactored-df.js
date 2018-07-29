var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

// 1: motivation - refactor dataframe

async function run() {    
    // 4 change last arg to false
    load('https://api.pro.coinbase.com/products',getHeaders(),false);
};

function callback(df) {
    df.show();
}

// 2 - add printout
function load(url,headers,printout) {
    request({headers:{'User-Agent': headers},
            uri:url}, 
            async (error, response, body) => {      
                json = JSON.parse(body);
                df = new DataFrame(json);
                if(printout) { // 3
                    console.log(df.dim());
                    console.log(df.listColumns());
                    console.log(df.count());
                    df.show();
                }
                callback(df);
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