/**
 *
 * Created by jl on 2/18/15.
 */


var AppDispatcher = require('../dispatchers/AppDispatcher');
var CONFIG = require('../configs/app-config');
var API = require('../apis/api');
var ServerRequestActionCreators = {};


var ACTION_TYPES = CONFIG.ACTION_TYPES;


ServerRequestActionCreators.requestLogin = function(account){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.LOGIN_REQUEST,
        data: account
    });
    API.login(account);
};

ServerRequestActionCreators.requestMessage = function(query){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGE_LIST_REQUEST,
        data: query
    });
    API.getMessagesList(query);
};


module.exports = ServerRequestActionCreators;
