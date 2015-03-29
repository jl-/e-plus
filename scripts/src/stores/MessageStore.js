/**
 *
 * Created by jl on 2/26/15.
 */


var AppDispatcher = require('../dispatchers/AppDispatcher');
var createStore = require('../utils/createStore');

var ACTION_TYPES = require('../configs/app-config').ACTION_TYPES;

var _list = null;
var _unread = null;
var _archive = null;
var _view = 'unread';

function gotList(list){
    console.log('////// got list');
    console.log(list);
    _list = list && list.body && list.body.list;
    if(_list){
        _unread = _list.filter(filterUnread);
    }
}
function gotArchive(data){
    console.log('///////// got message archive');
    data = data.body;
    console.log(data);
    _archive = data && data.status && data.archive;
    console.log(_archive);
}
function changeMessageView(view){
   _view = view;
}
function messageStatusChanged(data){
    console.log('/// message status change, process in messageStore');
    console.log(data);
    data = data && data.body || {messageIds: ''};

    function changeMessageStatus(message){
        if(data.messageIds.indexOf(message._id) !== -1){
            message.status = data.toStatus;
        }
    }
    (_list || []).forEach(changeMessageStatus);

    _unread = (_list || []).filter(filterUnread);

    (_archive || []).forEach(function(archive){
        (archive.items || []).forEach(changeMessageStatus);
    });


}
function deletedMessages(feedback){
    console.log('/// message deleted, process in messageStore');
    var deletedIds = feedback && feedback.body && feedback.body.deletedIds;
    if(!deletedIds) return;
    deletedIds = deletedIds.split('|');
    console.log(deletedIds);
    function filterMessage(message) {
        var i = deletedIds.indexOf(message._id) === -1;
        console.log(i);
        return i;
    }

    _list = (_list || []).filter(filterMessage);
    _unread = (_unread || []).filter(filterMessage);

    (_archive || []).forEach(function (archive) {
        archive.items = archive.items.filter(filterMessage);
    });
}

function filterUnread(data){
    return data && data.status === 'P';
}


var MessageStore = createStore({
    getList: function(){
        return _list;
    },
    getArchive: function(){
        return _archive;
    },
    getUnread: function(){
        return _unread;
    },
    getView: function(){
        return _view;
    }
});


MessageStore.dispatchToken = AppDispatcher.register(function(payload){

    var action = payload.action;
    switch (action.type){
        case ACTION_TYPES.MESSAGES_LIST_RESPONSE:
            gotList(action.data);
            MessageStore.emitChange();
            break;
        case ACTION_TYPES.MESSAGES_ARCHIVE_RESPONSE:
            gotArchive(action.data);
            MessageStore.emitChange();
            break;
        case ACTION_TYPES.MESSAGES_VIEW_CHANGE:
            changeMessageView(action.data);
            MessageStore.emitChange();
            break;
        case ACTION_TYPES.MESSAGES_STATUS_CHANGED:
            messageStatusChanged(action.data);
            MessageStore.emitChange();
            break;
        case ACTION_TYPES.MESSAGES_DELETED:
            deletedMessages(action.data);
            MessageStore.emitChange();
            break;
    }

});

module.exports = MessageStore;
