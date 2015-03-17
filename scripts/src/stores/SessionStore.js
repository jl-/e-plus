/**
 *
 * Created by jl on 2/19/15.
 */
var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;



var _error = null;
var _token;


function validateLoginFeedback(feedback){
    console.log('////////// session store');
    console.log(feedback);
    window.sessionStorage.removeItem('user');
    feedback = feedback && feedback.body || {};
    if(feedback.status === 1){
        _token = feedback.token;
        window.sessionStorage.setItem('token',_token);
    } else {
        _error = feedback.msg;
    }
}


var SessionStore = createStore({
    getError: function(){
        return _error;
    },
    getToken: function(){
        _token = _token || window.sessionStorage.getItem('token');
        return _token;
    },
    isLogin: function(){

    }
});

SessionStore.dispatchToken = AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.type){
        case ACTION_TYPES.LOGIN_RESPONSE:
            validateLoginFeedback(action.data);
            SessionStore.emitChange();
            break;
    }
});




module.exports = SessionStore;