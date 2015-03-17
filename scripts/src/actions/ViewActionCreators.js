/**
 *
 * Created by jl on 2/19/15.
 */

var CONFIG = require('../configs/app-config');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ACTION_TYPES = CONFIG.ACTION_TYPES;

var ViewActionCreators = {};



ViewActionCreators.changeMessageView = function (view) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.MESSAGES_VIEW_CHANGE,
        data: view
    });
};


ViewActionCreators.changeCallView = function (view) {
    AppDispatcher.dispatchAction({
        type: ACTION_TYPES.CALLS_VIEW_CHANGE,
        data: view
    });
};


module.exports = ViewActionCreators;
