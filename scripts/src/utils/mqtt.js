//var Paho = require('../vendors/mqttws31');
//
//var client;
//
//// Create a client instance
//client = new Paho.MQTT.Client('104.131.165.132', 1884 , "clientId");
//
//// set callback handlers
//client.onConnectionLost = onConnectionLost;
//client.onMessageArrived = onMessageArrived;
//
//// connect the client
//client.connect({onSuccess:onConnect});
//
//
//// called when the client connects
//function onConnect() {
//    // Once a connection has been made, make a subscription and send a message.
//    console.log("onConnect");
//    client.subscribe("/World");
//    message = new Paho.MQTT.Message("Hello");
//    message.destinationName = "/World";
//    client.send(message);
//}
//
//// called when the client loses its connection
//function onConnectionLost(responseObject) {
//    if (responseObject.errorCode !== 0) {
//        console.log("onConnectionLost:"+responseObject.errorMessage);
//    }
//}
//
//// called when a message arrives
//function onMessageArrived(message) {
//    console.log("onMessageArrived:"+message.payloadString);
//}

//module.exports = client;

var mqtt = require('mqtt');
var conn = 'ws://localhost:1883';
conn = 'ws://localhost:1885';
conn = 'ws://ef-server.jlxy.cz/1884';

conn = 'ws://104.131.165.132:1884';
//conn = 'ws://test.mosca.io/';

var client;
client = mqtt.connect(conn);

client.on('connect',function(){
    console.log('e-plus ws connected.');
    client.subscribe('presence');
});

client.on('message', function(topic, message) {
    console.log(message.toString());
    window.alert([topic,message]);
});
console.log('e-plus ws client started..');
console.log(client);

module.exports = client;