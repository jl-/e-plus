/**
 *
 * Created by jl on 2/19/15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _store = {
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT,callback);
    },
    removeChangeListener: function(callback){
        this.removeListener(CHANGE_EVENT,callback);
    }
};

var createStore = function(spec){
    return assign({},EventEmitter.prototype, _store, spec);
};


module.exports = createStore;
