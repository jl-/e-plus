/**
 *
 * Created by jl on 2/18/15.
 */
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');






var AppDispatcher = assign(new Dispatcher(),{
    dispatchAction: function(action){
        if(!action.type){
            throw new Error('Action type missing.');
        }
        this.dispatch({
            action: action
        });
    }
});

module.exports = AppDispatcher;



