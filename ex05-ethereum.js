var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

async function run() {

    // 1
    var url = 'https://etherscan.io/chart/etherprice?output=csv';

    // 2
    request('https://api.coinmarketcap.com/v1/ticker/', (error, response, body) => {
        console.log(body);
    });

    // 3
    DataFrame.fromCSV(url,true).then(df=> df.show(5));

    // 4
    df = await DataFrame.fromCSV(url,true);
    df.show(5);
    console.log(df.dim());
    console.log(df.listColumns());
    console.log(df.count());
};

// 11
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();