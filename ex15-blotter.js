var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;

// 1 explain blotter concept
async function run() {    
    
    // 3
    blotter = initializeBlotter();
    blotter.show();

    // 4 add dummy trades
    trade = [new Date(),'eth',1.3,455];
    blotter = blotter.push(trade);
    blotter.show();

    // 5 add multiple dummy trades
    console.log();
    blotter = blotter.push([new Date(),'eth',1.3,455],[new Date(),'eth',-1.1,480]);
    blotter.show(10);
};


// 2
function initializeBlotter() {
    blotter = new DataFrame([],['Timestamp','Crypto','Qty','Price']);
    return blotter;
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