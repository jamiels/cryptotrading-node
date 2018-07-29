var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
var plotly = require('plotly')('jamielsheikh', 'VNBx3ByJnTptdjg2d0Pc');

async function run() {    
    load('https://api.gdax.com/products/eth-usd/book?level=2',getHeaders(),false);
};

function callback(json) {
    // 1 clear function

    prices = [];
    
    // 2
    bids = [];
    
    // 6
    asks = [];

    // 3
    for (b in json.bids) {
        console.log(json.bids[b][0]);
        
        // 7
        prices.push(json.bids[b][0]);
        
        // 4
        bids.push(json.bids[b][0])
    }

    // 5
    console.log(prices.length);
    
    // 6
    for (a in json.asks) {
        console.log(json.asks[a][0]);

        // 7
        prices.push(json.asks[a][0]);
        
        asks.push(json.asks[a][0])
    }

    console.log(prices.length);

    // 8
    var bids_series = {
        x : prices,
        y : bids,
        name: 'bids',
        type: 'scatter'
    }
    var asks_series = {
        x : prices,
        y : asks,
        name: 'asks',
        type: 'scatter'
    }

    // 9
    var data = [bids_series,asks_series];

    // 10
    var layout = {
        title: "Eth Limit Book",
        yaxis: {title: "Bids"},
        yaxis2: {
          title: "Asks",
          titlefont: {color: "rgb(148, 103, 189)"},
          tickfont: {color: "rgb(148, 103, 189)"},
          overlaying: "y",
          side: "right"
        }
      };
    
    // 11
    var options = {layout: layout, filename: "eth-limitbook", fileopt: "overwrite"};
    
    // 12
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