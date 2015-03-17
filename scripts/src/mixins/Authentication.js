/**
 *
 * Created by jl on 2/20/15.
 */

var SessionStore = require('../stores/SessionStore');

var Authentication = {
    statics:{
        willTransitionTo: function(transition){
            var token = SessionStore.getToken();
            if(!token){
                transition.redirect('entry');
            }
        }
    }
};

module.exports = Authentication;