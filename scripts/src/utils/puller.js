
var mqtt = require('mqtt');
var CONFIG = require('../configs/app-config');
var keyMirror = require('../utils/keyMirror');

var puller = {};
var STATUS = 'PENDING,RESOLVED,REJECTED';
var DURS = 10000;
STATUS = keyMirror(STATUS);

var client = mqtt.connect(CONFIG.WS_CONN);


client.on('connect',function(){
    console.log('e-plus ws connected.');
});


puller.subscribe = function(topic) {
    client.subscribe(topic);
    console.log('top: ' + topic + ' subscribed.');
};


puller.pull = function(toTopic, data, onTopic, callback) {
    client.publish(toTopic, data);
    client.on('message', function(tp, message) {
        message = message ? message.toString() : '';
        console.log(message);
        if (tp === onTopic && puller.status !== STATUS.REJECTED && message === 'FINISH_UPLOAD') {
            console.log('get pull responsed: ');
            clearTimeout(puller.timer);
            puller.status = STATUS.RESOLVED;
            callback.call(null, message);
        }
    });
    puller.timer = setTimeout(function(){
        puller.status = STATUS.REJECTED;
        console.log('pull timeout..');
        callback.call(null,{});
    },DURS);
};


console.log('e-plus ws client started..');
console.log(client);

module.exports = puller;