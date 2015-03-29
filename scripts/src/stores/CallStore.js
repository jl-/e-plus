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
var _unread;

function gotList(list){
    console.log('////// got list');
    console.log(list);
    _list = list && list.body && list.body.list;
    if(_list){
        _unread = _list.filter(filterUnread);
    }
}
function gotArchive(data){
    console.log('call archive');
    data = data.body;
    console.log(data);
    _archive = data && data.status && data.archive;
    console.log(_archive);
}

function filterUnread(data){
    return data && data.status === 'P';
}


function changeCallView(view){
    _view = view;
}
function callStatusChanged(data){
    console.log(data);
    data = data && data.body || {callIds: ''};

    function changeCallStatus(call){
        if(data.callIds.indexOf(call._id) !== -1){
            call.status = data.toStatus;
        }
    }
    (_list || []).forEach(changeCallStatus);

    _unread = (_list || []).filter(filterUnread);

    (_archive || []).forEach(function(archive){
        (archive.items || []).forEach(changeMessageStatus);
    });
}
function deletedCalls(feedback){
    var deletedIds = feedback && feedback.body && feedback.body.deletedIds;
    if(!deletedIds) return;
    deletedIds = deletedIds.split('|');


    function filterCall(call){
        return deletedIds.indexOf(call._id) === -1;
    }

    _list = (_list || []).filter(filterCall);
    _unread = (_unread || []).filter(filterCall);

    (_archive || []).forEach(function(archive){
        archive.items = archive.items.filter(filterCall);
    });

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
    },
    getUnread: function(){
        return _unread;
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
            gotArchive(action.data);
            CallStore.emitChange();
            break;
        case ACTION_TYPES.CALLS_VIEW_CHANGE:
            changeCallView(action.data);
            CallStore.emitChange();
            break;
        case ACTION_TYPES.CALLS_STATUS_CHANGED:
            callStatusChanged(action.data);
            CallStore.emitChange();
            break;
        case ACTION_TYPES.CALLS_DELETED:
            deletedCalls(action.data);
            CallStore.emitChange();
            break;
    }

});

module.exports = CallStore;
