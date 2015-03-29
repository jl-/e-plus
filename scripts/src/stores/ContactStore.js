/**
 *
 * Created by jl on 2/19/15.
 */
var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;



var _error = null;
var _archive;

function gotList(data){
    console.log('got contact list');
    console.log(data);
    data = data && data.body && data.body.list;
    _archive = data;
    console.log(_archive);
}


var ContactStore = createStore({
    getError: function(){
        return _error;
    },
    getArchive: function(){
        return _archive;
    }
});

ContactStore.dispatchToken = AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.type){
        case ACTION_TYPES.CONTACTS_LIST_RESPONSE:
            gotList(action.data);
            ContactStore.emitChange();
            break;
    }
});




module.exports = ContactStore;