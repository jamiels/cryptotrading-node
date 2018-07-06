// 1
const er = require('blockchain.info/exchange');
const ct = require('console.table');


async function run() {
    // 2
    currencySymbols = await er.getTicker();
    console.log(currencySymbols)

    // 3
    for (var i; i < currencySymbols.length; i++) {
        //console.log(currencySymbols[i]);
    }

    // 4
    console.log(currencySymbols.USD);
    console.log(currencySymbols.NZD);

    // 5
    for (c in currencySymbols) {
      console.log(c);
    }

    // 6
    for (c in currencySymbols) {
        console.log(currencySymbols[c]);
    }

    // 7
    z = [];
    for (c in currencySymbols) {
        x = {};
        x[c] = currencySymbols[c].last;
        z.push(x);
    }
    console.log(z);

    // 8
    // npm install --save console.table
    
    // 9
    console.table(currencySymbols.USD);

    // 10
    cash = 5000;
    cadBTC = await er.toBTC(cash,'CAD');
    console.log(cash,'CAD costs',cadBTC,'BTCs');

    // 11
    for (c in currencySymbols) {
        toBTC = await er.toBTC(cash,c);
        console.log(cash,c,'costs',toBTC,'BTCs');
    }

    // 12
    satoshis = 100000000;
    for (c in currencySymbols) {
        fromBTC = await er.fromBTC(satoshis,c);
        console.log(satoshisToBtc(satoshis),'BTCs is equal to',fromBTC,c,'s');
    }


};

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();