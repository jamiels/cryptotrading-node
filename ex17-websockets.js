// 1 npm install websocket
// may require python 2.7 / c++
// https://github.com/theturtle32/WebSocket-Node

// 2
var WebSocketClient = require('websocket').client;


async function run() {    
    // 3 clear out other code

    // 4
    client = new WebSocketClient();
    
    // 5
    client.on('connect', function(conn) {
        console.log('Connected');
        conn.on('message', function(message) {
            console.log(message);
            
            // 6
            console.log(JSON.parse(message.utf8Data).changes);
        });
        conn.sendUTF(requestBuilder());
    });

    // 7
    client.connect('wss://ws-feed.gdax.com');
};

// 
// 8
// 9 - switch ticker to heartbeat
function requestBuilder() {
    request = `
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

    return request;
}


run();