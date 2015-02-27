/**
 *
 * Created by jl on 2/26/15.
 */


var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;

var _list = null;
var _archive = null;

function gotList(list){
    console.log('////// got list');
    console.log(list);
    _list = list && list.body;
}
function gotArchive(){

}



var MessageStore = createStore({
    getList: function(){
        return _list;
    },
    getArchive: function(){
        return _archive;
    }
});


MessageStore.dispatchToken = AppDispatcher.register(function(payload){

    var action = payload.action;
    switch (action.type){
        case ACTION_TYPES.MESSAGE_LIST_RESPONSE:
            gotList(action.data);
            MessageStore.emitChange();
            break;
        case ACTION_TYPES.MESSAGE_ARCHIVE_RESPONSE:
            break;
    }

});

module.exports = MessageStore;
