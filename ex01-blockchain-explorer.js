// npm i --save blockchain.info
// http://bit.ly/ChainhausCryptoTrader

var be = require('blockchain.info/blockexplorer');

async function run() {

    // show without await and then dicuss need for await, what is a promise
    latest_block = await be.getLatestBlock();
    //console.log('Latest block:',latest_block.height);
    //console.log('Latest hash:',latest_block.hash)

    pizzaBlockHash = "00000000152340ca42227603908689183edc47355204e7aca59383b0aaac1fd8";
    pizzaTxHash = "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d";

    pizzaBlock = await be.getBlock(pizzaBlockHash);
    //console.log(pizzaBlock);
    //console.log('The block height for the Laszlo tx is',pizzaBlock.height);

    pizzaTxs = await be.getTx(pizzaTxHash);
    //console.log(pizzaTxs);

    for (var i=0; i < pizzaTxs.inputs.length; i++) {
        //console.log(satoshisToBtc(pizzaTxs.inputs[i].prev_out.value));
    }

    for (var i=0; i < pizzaTxs.out.length; i++) {
        //console.log(satoshisToBtc(pizzaTxs.out[i].value));
    }

    laszloAddress = "1XPTgDRhN8RFnzniWCddobD9iKZatrvH4";
    laszloTxs = await be.getAddress(laszloAddress);
    //console.log(laszloTxs);
    for (var i =0; i < laszloTxs.txs.length; i++) {
        console.log(satoshisToBtc(laszloTxs.txs[i].out[0].value));
    }

};

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();