/**
 *
 * Created by jl on 2/18/15.
 */


var AppDispatcher = require('../dispatchers/AppDispatcher');
var CONFIG = require('../configs/app-config');
var API = require('../apis/api');
var ServerRequestActionCreators = {};


var ACTION_TYPES = CONFIG.ACTION_TYPES;


//=============
// auth
//////////////////////////
ServerRequestActionCreators.requestLogin = function(account){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.LOGIN_REQUEST,
        data: account
    });
    API.login(account);
};



//================
// settings
//////////////////////////
ServerRequestActionCreators.requestProfile = function(token){
    API.getProfile(token);
};


//==================
// message
///////////////////////////
ServerRequestActionCreators.requestMessages = function(query){
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGES_LIST_REQUEST,
        data: query
    });
    API.getMessagesList(query);
};
ServerRequestActionCreators.changeMessagesStatus = function(messageIds,status){
    API.changeMessagesStatus(messageIds,status);
};

ServerRequestActionCreators.deleteMessages = function(messageIds){
    API.deleteMessages(messageIds);
};

//============
// call
/////////////////
ServerRequestActionCreators.requestCalls = function(query){
    API.getCallsList(query);
};
ServerRequestActionCreators.changeCallsStatus = function(callIds,status){
    API.changeCallsStatus(callIds,status);
};
ServerRequestActionCreators.deleteCalls = function(callIds){
    API.deleteCalls(callIds);
};


//==========
// contact
////////////////////
ServerRequestActionCreators.requestContacts = function(query){
    API.getContactsList(query);
};
ServerRequestActionCreators.deleteContacts = function(contactIds){
    API.deleteContacts(contactIds);
};
ServerRequestActionCreators.deleteContacts = function(contactIds){
    API.deleteContacts(contactIds);
};
ServerRequestActionCreators.deleteContacts = function(contactIds){
    API.deleteContacts(contactIds);
};

module.exports = ServerRequestActionCreators;
