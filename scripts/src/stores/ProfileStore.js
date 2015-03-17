/**
 *
 * Created by jl on 2/19/15.
 */
var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;



var _profile = null;
var _error;


function gotProfile(feedback){
    console.log('////////// profile store');
    console.log(feedback);
    window.sessionStorage.removeItem('profile');
    feedback = feedback && feedback.body || {};
    if(feedback.status === 1){
        _profile = feedback.profile;
        window.sessionStorage.setItem('profile',JSON.stringify(_profile));
    } else {
        _error = feedback.msg;
    }
}


var ProfileStore = createStore({
    getError: function(){
        return _error;
    },
    getProfile: function(){
        _profile = _profile || window.sessionStorage.getItem('profile');
        return _profile;
    }
});

ProfileStore.dispatchToken = AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.type){
        case ACTION_TYPES.PROFILE_RESPONSE:
            gotProfile(action.data);
            ProfileStore.emitChange();
            break;
    }
});




module.exports = ProfileStore;