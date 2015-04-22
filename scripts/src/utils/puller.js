
var mqtt = require('mqtt');
var CONFIG = require('../configs/app-config');
var keyMirror = require('../utils/keyMirror');

var puller = {};
var STATUS = 'PENDING,RESOLVED,REJECTED';
var DURS = 10000;
STATUS = keyMirror(STATUS);

var client = mqtt.connect(CONFIG.WS_CONN);




puller.subscribe = function(topic) {
    client.subscribe(topic);
    console.log('top: ' + topic + ' subscribed.');
};

puller.handlers = [];
puller.pushHandler = function (handler){
   puller.handlers.push(handler);
};
puller.shiftHandler = function(){
   puller.handlers.shift();
};
puller.getHandlers = function(topic) {
    return puller.handlers.filter(function(handler){
        return handler.onTopic === topic;
    });
};
puller.emptyHandlers = function(){
    puller.handlers = [];
};


puller.pull = function(toTopic, data, onTopic, callback) {
    var handler = {
        onTopic: onTopic,
        callback: callback,
        status: STATUS.PENDING
    };
    handler.timer = setTimeout(function(){
            handler.status = STATUS.REJECTED;
            console.log('pull timeout..');
            handler.callback.call(null);
    },DURS);
    puller.pushHandler(handler);

    client.publish(toTopic, data);
};



client.on('connect',function(){
    console.log('e-plus ws connected.');
});
client.on('message', function(tp, message) {
    var handlers = puller.getHandlers(tp);

    if(handlers.length > 0) {
        console.log('/// handlers for topic: ' + tp);
        console.log(handlers);

        message = message ? message.toString() : '';

        handlers.forEach(function(handler){
            if (handler.status !== STATUS.REJECTED) {
                clearTimeout(handler.timer);
                handler.status = STATUS.RESOLVED;
                handler.callback.call(null, message);
            }
        });
    }
});

console.log('e-plus ws client started..');
console.log(client);

module.exports = puller;