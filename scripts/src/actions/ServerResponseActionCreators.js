/**
 *
 * Created by jl on 2/19/15.
 */

var CONFIG = require('../configs/app-config');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ACTION_TYPES = CONFIG.ACTION_TYPES;

var ServerResponseActionCreators = {};



ServerResponseActionCreators.gotLoginFeedback = function (feedback) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.LOGIN_RESPONSE,
        data: feedback
    });
};

ServerResponseActionCreators.gotMessagesList = function(messages){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGE_LIST_RESPONSE,
        data: messages
    });
};



module.exports = ServerResponseActionCreators;
