var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
var plotly = require('plotly')('jamielsheikh', 'VNBx3ByJnTptdjg2d0Pc');

async function run() {    
    // 1 change to btc
    load('https://api.gdax.com/products/btc-usd/trades',getHeaders(),false);
};

function callback(json) {

    df = new DataFrame(json);

    // 2
    df_time = df.select('time');
    df_price = df.select('price');


    // 3
    var data = [{ x: df_time.toArray(), y: df_price.toArray(), type: "scatter"}];
    var options = {filename: "btc-trading-time-series", fileopt: "overwrite"};
    plotly.plot(data, options, function (err, msg) {
          console.log(msg);
    });  
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