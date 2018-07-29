var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

async function run() {

    // 1 header issue
    request('https://api.pro.coinbase.com/products', async (error, response, body) => {
        json = JSON.parse(body);
        console.log(json);
    });

    // 3
    request({headers:{'User-Agent': getHeaders()},
    uri:'https://api.pro.coinbase.com/products'}, async (error, response, body) => {      
        json = JSON.parse(body);
        console.log(json);
        df = new DataFrame(json);
        console.log(df.dim());
        console.log(df.listColumns());
        console.log(df.count());
        df.show();

        // 4 explain data
        /*
         from docs:
        // The base_min_size and base_max_size fields define the min and max order size. The quote_increment field specifies the min order price as well as the price increment.

            The order price must be a multiple of this increment (i.e. if the increment is 0.01, order prices of 0.001 or 0.021 would be rejected).

        */
    });

};

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