var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
var plotly = require('plotly')('jamielsheikh', 'VNBx3ByJnTptdjg2d0Pc');

// https://www.coindesk.com/api/

async function run() {

    // 1
    // dataframe-js cannot load this json, we need to do some manual work

    request('http://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2018-05-28', async (error, response, body) => {
        
        // 2
        json = JSON.parse(body);

        // 3
        console.log(json);

        // 4
        console.log(json.bpi); // notice json is missing keys

        
        // 6
        dates = [];
        prices = [];

       // 5
       for (j in json.bpi) {
           console.log(j,json.bpi[j]);

           // 6
           dates.push(j);
           prices.push(json.bpi[j]);
       }

       // 6
       console.log(dates);

       // 7
       // https://plot.ly/~jamielsheikh/4
       var data = [{ x: dates, y: prices, type: "scatter"}];
       var options = {filename: "coindesk-bpi", fileopt: "overwrite"};
       plotly.plot(data, options, function (err, msg) {
             console.log(msg);
       });
    });

};

// 11
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();