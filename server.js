/**
 *
 * Created by jl on 2/14/15.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var configs = require('./config');
var router = require('./router');
var render = require('./render');




app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-Modified-Since');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});


app.set('view engine', 'jade');


app.use('/statics',express.static(__dirname + '/../e-plus'));

app.get('/',router.index);

app.listen(configs.server.port,configs.server.address);
console.log('listen: ' + configs.server.address + ':' + configs.server.port);


