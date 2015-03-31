/**
 *
 * Created by jl on 2/19/15.
 */

var CONFIG = require('../configs/app-config');

var request = require('superagent');

var ServerResponseActionCreators = require('../actions/ServerResponseActionCreators');
var SessionStore = require('../stores/SessionStore');


var API_CONFIG = CONFIG.APIS;

var API = {};

/// auth
API.login = function(account){

    //setTimeout(function () {
    //    AuthActionCreators.gotLoginFeedback({feedback:'fb'});
    //},2000);

    setTimeout(function () {
        request.post(API_CONFIG.LOGIN)
            .send({
                phone: account.phone,
                password: account.password
            })
            .end(function(err,data){
                ServerResponseActionCreators.gotLoginFeedback(data || err);
            });
    },1000);

};

/// profile
API.getProfile = function(token){
    request.get(API_CONFIG.PROFILE)
        .set('Authorization', 'Bearer ' + (token || SessionStore.getToken()))
        .end(function(err,data){
            ServerResponseActionCreators.gotProfile(data || err);
        });
};


/// message
API.getMessagesList = function(query){
    request.get(API_CONFIG.MESSAGES_LIST)
        .query(query)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .end(function(err,data){
            if(query && query.archive){
                ServerResponseActionCreators.gotMessagesArchive(data || err);
            }else{
                ServerResponseActionCreators.gotMessagesList(data || err);
            }
        });
};
API.getArchiveMessages = function(query){

};
API.changeMessagesStatus = function(messageIds,status){
    request.put(API_CONFIG.CHANGE_MESSAGES_STATUS)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .send({
            messageIds: messageIds,
            status: status
        })
        .end(function(err,data){
            ServerResponseActionCreators.gotChangeMessagesStatusFeedback(data || err);
        });
};
API.deleteMessages = function(messageIds){
    request.del(API_CONFIG.DELETE_MESSAGES)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .send({
            messageIds: messageIds
        })
        .end(function(err,data){
            ServerResponseActionCreators.gotDeleteMessagesFeedback(data || err);
        });

};

/// call
API.getCallsList = function(query){
    request.get(API_CONFIG.CALLS_LIST)
        .query(query)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .end(function(err,data){
            if(query && query.archive){
                ServerResponseActionCreators.gotCallsArchive(data || err);
            }else{
                ServerResponseActionCreators.gotCallsList(data || err);
            }
        });
};
API.changeCallsStatus = function(callIds,status){
    request.put(API_CONFIG.CHANGE_CALLS_STATUS)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .send({
            callIds: callIds,
            status: status
        })
        .end(function(err,data){
            ServerResponseActionCreators.gotChangeCallsStatusFeedback(data || err);
        });
};
API.deleteCalls = function(callIds){
    request.del(API_CONFIG.DELETE_CALLS)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .send({
            callIds: callIds
        })
        .end(function(err,data){
            ServerResponseActionCreators.gotDeleteCallsFeedback(data || err);
        });

};



/// contact

API.getContactsList = function(query){
    console.log('api request contact');
    request.get(API_CONFIG.CONTACTS_LIST)
    .query(query)
    .set('Authorization', 'Bearer ' + SessionStore.getToken())
    .end(function(err,data){
        if(query && query.archive){
            ServerResponseActionCreators.gotContactsArchive(data || err);
        }else{
            ServerResponseActionCreators.gotContactsList(data || err);
        }
    });
};
API.deleteContacts = function(contactIds){
    request.del(API_CONFIG.DELETE_CONTACTS)
        .set('Authorization', 'Bearer ' + SessionStore.getToken())
        .send({
            contactIds: contactIds
        })
        .end(function(err,data){
            ServerResponseActionCreators.gotDeleteContactsFeedback(data || err);
        });

};


module.exports = API;
