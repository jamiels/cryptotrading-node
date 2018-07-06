// 1
// npm install dataframe-js

// 22
var request = require('request');
var DataFrame = require('dataframe-js').DataFrame;
       
async function run() {
    //url = 'https://etherscan.io/chart/etherprice?output=csv'
    // 3
    request('https://etherscan.io/chart/etherprice?output=csv', (error, response, body) => {
        
        console.log(body);



        // 6
        DataFrame.fromCSV(body).then((df)=> {df.show()});
        
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