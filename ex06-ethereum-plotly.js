var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
var plotly = require('plotly')('jamielsheikh', 'VNBx3ByJnTptdjg2d0Pc');

async function run() {

    // 1 - Display and explain plotly
    // Learn about API authentication here: https://plot.ly/nodejs/getting-started
    // Find your api_key here: https://plot.ly/settings/api

    // 2 - 

    // 2 - npm i --save plotly
    // 2
    var url = 'https://etherscan.io/chart/etherprice?output=csv';
    df = await DataFrame.fromCSV(url,true); // True if has header
    df_values = df.select('Value');
    df_ts = df.select('Date(UTC)');
    df_values.show(3);
    df_ts.show(3);
    //console.log(df.toArray());

    // https://plot.ly/javascript/
    var data = [{ x: df_ts.toArray(), y: df_values.toArray(), type: "scatter"}];
    var options = {filename: "ethereum-prices", fileopt: "overwrite"};
    plotly.plot(data, options, function (err, msg) {
          console.log(msg);
    });
    
    // https://plot.ly/organize/home/
};

// 11
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();