// 1
// npm install dataframe-js
// https://www.npmjs.com/package/dataframe-js
// Docs

// 2
var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;


       
async function run() {
    
    // 3
    request('https://api.coinmarketcap.com/v1/ticker/', async (error, response, body) => {
        
        // 4
        json = JSON.parse(body);
        console.log(json);

        // 5
        for (j in json) {
            console.log(json[j].id,json[j].price_usd);
        }

        // 6 - DF metadata
        var df = new DataFrame(json);
        console.log(df.dim());
        console.log(df.listColumns());
        console.log(df.count());
        df.show();
        df.show(3);

        //7    
        
        // 8
        df = df.select('name','symbol', 'price_usd');
        df.show();
        
        // 9
        df = df.sortBy('symbol')
        df.show(10);

        // 10
        df =df.where(row => row.get('symbol')==='ETH');
        df.show();

    });



    //12
    console.log('litecoin price stream');
    for (var i=0;i<2;i++) {
        var df;
        var json;
        request('https://api.coinmarketcap.com/v1/ticker/litecoin', (error, response, body) => {
            json = JSON.parse(body);
            df = new DataFrame(json).select('price_usd');
            df.show();
        });
        await sleep(5000);
    };

    // 13 - Refactor
    df = await DataFrame.fromJSON('https://api.coinmarketcap.com/v1/ticker/');
    df.show(5);
};

// 11
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();