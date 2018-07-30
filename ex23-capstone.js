var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
var readline = require('readline-sync');

async function run() {    
    
    cryptos = ['eth-usd','btc-usd'];
    blotter = initializeBlotter(); 
    pl = initializePL(cryptos);

    while(true) {
        displayMenu();
        choice = readline.question("Choose: ");
        switch(choice) {
            case '4': 
                process.exit();
            case '1':
                crypto = readline.question("Crypto to buy (eth-usd or btc-usd): ");
                qty = readline.question("Quantity: ");
                updatedBlotterPL = await trade(blotter,pl,qty,crypto);
                blotter = updatedBlotterPL[0];
                pl = updatedBlotterPL[1];
                break;
            case '2':
                blotter.show();
                break;
            case '3':
                pl.show();
                break;
        }
    };

};

function updatePL(pl,crypto,qty,price) {

    // Capstone hints:
    // find the current qty in pl for this crypto
    // find the current vwap in pl for this crypto
    // set newQuantity = current qty + qty
    // if newQuantity = 0, set vwap = 0, otherwise calc new vwap
    // upl = (newQuantity * price) - (newQuantity * new vwap)
    // rpl = on sell only, currentRPL + ... (abs(qty) * price) - (abs(qty) * currentVWAP)

   return pl;
}


function displayMenu() {
    console.log('1. Trade');
    console.log('2. View Blotter');
    console.log('3. View PL');
    console.log('4. Exit');
}

function calc_vwap(current_qty,current_vwap,qty,price) {
    current_dollar = current_qty * current_vwap;
    new_dollar = current_dollar + (qty * price);
    new_qty = current_qty + qty;
    new_vwap = new_dollar / new_qty;
    return new_vwap;
}


async function trade(blotter,pl,qty,crypto) {
    quote = await getPrice(crypto);
    if (qty>0) {
        price = quote.ask;
    } else {
        price = quote.bid;
    }

    blotter = blotter.push([new Date(),crypto,qty,price]);
    pl = updatePL(pl,crypto,qty,price);
    return [blotter,pl]; // change to array
}


function initializeBlotter() {
    return new DataFrame([],['Timestamp','Crypto','Qty','Price']);
}

function initializePL(cryptos) {
    pl = new DataFrame([],['Crypto','Position','VWAP','UPL','RPL']);
    for (c in cryptos) {
        pl = pl.push([cryptos[c],0,0,0,0]);
    }
    return pl;
}

async function load(url,headers,printout) {
    // 1 wrap with a promise and clean out callback
    return new Promise(function (resolve,reject) {
        request({headers:{'User-Agent': headers},
                uri:url}, 
                async (error, response, body) => {
                    json = JSON.parse(body);
                    if(printout)
                        console.log(json); 
                    resolve(json);
        });
    });
}

async function getPrice(crypto) {
    url = 'https://api.gdax.com/products/'+crypto+'/book';
    prices = await load(url,getHeaders(),false);
    //console.log(prices); // remove
    bid = prices.bids[0][0];
    ask = prices.asks[0][0];
    bidask = {'bid':bid,'ask':ask};
    return bidask;
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