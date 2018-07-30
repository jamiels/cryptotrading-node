var WebSocketClient = require('websocket').client;

// 1 npm install gdax

async function run() {    

    
    conbaseProRequest = `
    {
        "type": "subscribe",
        "product_ids": [
            "ETH-USD"
        ],
        "channels": [
            "level2",
            "ticker",
            {
                "name": "ticker",
                "product_ids": [
                    "ETH-USD"
                ]
            }
        ]
    }`
    
    
    
    bitfinexRequest = `
    {
        "event":"subscribe",
        "channel":"book",
        "symbol":"ETHUSD"
     }
     `

    coinbaseProClient = new WebSocketClient();
    
   
    coinbaseProClient.on('connect', function(conn) {
        console.log('Connected');
        conn.on('message', function(message) {
            console.log('Bitfinex: ',JSON.parse(message.utf8Data).changes);
        });
        conn.sendUTF(conbaseProRequest);
    });
    coinbaseProClient.connect('wss://ws-feed.gdax.com');

    bitfinexClient = new WebSocketClient();
    bitfinexClient.on('connect', function(conn) {
        console.log('Connected');
        conn.on('message', function(message) {
            console.log('Coinbase Pro',message);
        });
        conn.sendUTF(bitfinexRequest);
    });

    bitfinexClient.connect('wss://api.bitfinex.com/ws');

};


run();