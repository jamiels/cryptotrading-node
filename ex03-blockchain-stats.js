// 1
const stats = require('blockchain.info/statistics');

async function run() {
    s = await stats.get();

    console.log(s);

    console.log('BTCUSD',s.market_price_usd);
    console.log('# of BTCs traded last 24 hours:', s.trade_volume_btc);
    console.log('# of TXs traded last 24 hours:', s.n_tx);
    console.log('Total # of BTCs traded ever:',s.total_btc_sent);
    console.log('Consensus algo mean time:',minutes_between_blocks);

    // http://bitcoin.sipa.be/
    console.log('Hash rate',s.hash_rate);
    console.log('Difficulty', s.difficulty);
    
};

function satoshisToBtc(satoshi) {
    return satoshi / 100000000;
}

run();