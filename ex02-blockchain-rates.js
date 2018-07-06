// 1
// npm init
// npm i --save blockchain.info


// 2
var be = require('blockchain.info/exchange');

// 3
async function run() {
    // 4
    // show without await and then dicuss need for await, what is a promise
    latest_block = await be.getLatestBlock();
    // 5
    //console.log('Latest block:',latest_block.height);
    // 6
    //console.log('Latest hash:',latest_block.hash)

    // 7 - http://bit.ly/ChainhausCryptoTrader
    pizzaBlockHash = "00000000152340ca42227603908689183edc47355204e7aca59383b0aaac1fd8";
    pizzaTxHash = "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d";

    // 8
    pizzaBlock = await be.getBlock(pizzaBlockHash);
    
    // 9
    //console.log(pizzaBlock);
    //console.log('The block height for the Laszlo tx is',pizzaBlock.height);

    // 10 - Show on blockchain.info
    pizzaTxs = await be.getTx(pizzaTxHash);
    //console.log(pizzaTxs);

    // 11 - Explain UTXOs
    for (var i=0; i < pizzaTxs.inputs.length; i++) {
        //console.log(satoshisToBtc(pizzaTxs.inputs[i].prev_out.value));
    }

    // 12
    for (var i=0; i < pizzaTxs.out.length; i++) {
        //console.log(satoshisToBtc(pizzaTxs.out[i].value));
    }

    // 13
    laszloAddress = "1XPTgDRhN8RFnzniWCddobD9iKZatrvH4";
    
    // 14
    laszloTxs = await be.getAddress(laszloAddress);
    //console.log(laszloTxs);

    // 15
    console.log(laszloTxs.txs[0]);
    
    // 16
    for (var i =0; i < laszloTxs.txs.length; i++) {
        console.log(satoshisToBtc(laszloTxs.txs[i].out[0].value));
    }

};

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();