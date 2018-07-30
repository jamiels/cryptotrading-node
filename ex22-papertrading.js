const Gdax = require('gdax');

// 1 npm install gdax

async function run() {    
    key = '';
    secret = '';
    passphrase = '';

    apiURI = 'https://api.gdax.com';
    sandboxURI = 'https://api-public.sandbox.gdax.com';

    gdax = new Gdax.AuthenticatedClient(
        key,
        secret,
        passphrase,
        apiURI
    );

    buyParams = {
        price: '0.100', // USD
        size: '0.01', // BTC
        product_id: 'BTC-USD',
      };

    authedClient.buy(buyParams, callback);

    /*
    HTTP POST /orders

    {
    "size": "0.01",
    "price": "0.100",
    "side": "buy",
    "product_id": "BTC-USD"
    }

    */

};


run();