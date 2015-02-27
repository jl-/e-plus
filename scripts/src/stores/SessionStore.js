/**
 *
 * Created by jl on 2/19/15.
 */
var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;



var _user = null;
var _error = null;


function validateLoginFeedback(feedback){
    console.log('////////// session store');
    console.log(feedback);
    window.sessionStorage.removeItem('user');
    feedback = feedback && feedback.body || {};
    if(feedback.status){
        _user = feedback.user;
        window.sessionStorage.setItem('user',JSON.stringify(_user));
    } else {
        _error = feedback;
    }
}


var SessionStore = createStore({
    getUser: function(){
        _user = _user || JSON.parse(window.sessionStorage.getItem('user'));
        return _user;
    },
    getError: function(){
        return _error;
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