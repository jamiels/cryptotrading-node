var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

// 1: motivation - we will be loading data, best to factor out to seperate load function. async issues will arise.

async function run() {    
    load('https://api.pro.coinbase.com/products',getHeaders(),false);
};

function callback(json) {
    console.log(json);
    df = new DataFrame(json);
    console.log(df.dim());
    console.log(df.listColumns());
    console.log(df.count());
    df.show();
}

// 2 - race
function load(url,headers,printout) {
    var json;
    request({headers:{'User-Agent': headers},
            uri:url}, 
            async (error, response, body) => {      
                json = JSON.parse(body);
                if(printout)
                    console.log(json);
                return json;
    });
}

// 3
function load(url,headers) {
    var json;
    request({headers:{'User-Agent': headers},
            uri:url}, 
            async (error, response, body) => {      
                json = JSON.parse(body);
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