/**
 *
 * Created by jl on 2/26/15.
 */


var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;

var _list = null;
var _archive = null;
var _view = 'unread';

function gotList(list){
    console.log('////// got list');
    console.log(list);
    _list = list && list.body && list.body.list;
}
function gotArchive(){

}
function changeMessageView(view){
    _view = view;
}
function callStatusChanged(data){
    console.log('/// message status change, process in messageStore');
    console.log(data);
    data = data && data.body || {callIds: ''};

    function changeCallStatus(call){
        if(data.callIds.indexOf(call._id) !== -1){
            call.status = data.toStatus;
        }
    }
    (_list || []).forEach(changeCallStatus);
    (_archive || []).forEach(changeCallStatus);

}
function deletedCalls(feedback){
    console.log('/// message deleted, process in messageStore');
    console.log(data);
}


var CallStore = createStore({
    getList: function(){
        return _list;
    },
    getArchive: function(){
        return _archive;
    },
    getView: function(){
        return _view;
    }
});


CallStore.dispatchToken = AppDispatcher.register(function(payload){

    var action = payload.action;
    switch (action.type){
        case ACTION_TYPES.CALLS_LIST_RESPONSE:
            gotList(action.data);
            CallStore.emitChange();
            break;
        case ACTION_TYPES.CALLS_ARCHIVE_RESPONSE:
            break;
        case ACTION_TYPES.CALLS_VIEW_CHANGE:
            changeMessageView(action.data);
            CallStore.emitChange();
            break;
        case ACTION_TYPES.CALLS_STATUS_CHANGED:
            callStatusChanged(action.data);
            CallStore.emitChange();
            break;
        case ACTION_TYPES.CALLS_DELETED:
            deletedCalls(action.data);
            break;
    }

});

module.exports = CallStore;
