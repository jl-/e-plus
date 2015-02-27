/**
 *
 * Created by jl on 2/19/15.
 */

var CONFIG = require('../configs/app-config');

var request = require('superagent');

var ServerResponseActionCreators = require('../actions/ServerResponseActionCreators');


var API_CONFIG = CONFIG.APIS;

var API = {};

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

/// message
API.getMessagesList = function(query){
    request.get(API_CONFIG.MESSAGE_LIST)
        .query(query)
        .end(function(err,data){
            ServerResponseActionCreators.gotMessagesList(data || err);
        });
};
API.getArchiveMessages = function(query){

};




module.exports = API;
