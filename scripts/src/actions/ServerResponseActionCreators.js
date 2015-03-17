/**
 *
 * Created by jl on 2/19/15.
 */

var CONFIG = require('../configs/app-config');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ACTION_TYPES = CONFIG.ACTION_TYPES;

var ServerResponseActionCreators = {};


/// auth
ServerResponseActionCreators.gotLoginFeedback = function (feedback) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.LOGIN_RESPONSE,
        data: feedback
    });
};


/// profile
ServerResponseActionCreators.gotProfile = function(feedback){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.PROFILE_RESPONSE,
        data: feedback
    });
};

/// message
ServerResponseActionCreators.gotMessagesList = function(messages){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGES_LIST_RESPONSE,
        data: messages
    });
};
ServerResponseActionCreators.gotMessagesArchive = function(messages){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGES_ARCHIVE_RESPONSE,
        data: messages
    });
};
ServerResponseActionCreators.gotChangeMessagesStatusFeedback = function (feedback) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGES_STATUS_CHANGED,
        data: feedback
    });
};
ServerResponseActionCreators.gotDeleteMessagesFeedback = function (feedback) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGES_DELETED,
        data: feedback
    });
};

/// call
ServerResponseActionCreators.gotCallsList = function(calls){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.CALLS_LIST_RESPONSE,
        data: calls
    });
};
ServerResponseActionCreators.gotChangeCallsStatusFeedback = function (feedback) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.CALLS_STATUS_CHANGED,
        data: feedback
    });
};

module.exports = ServerResponseActionCreators;
