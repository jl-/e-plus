/**
 *
 * Created by jl on 2/20/15.
 */

var SessionStore = require('../stores/SessionStore');

var Authentication = {
    statics:{
        willTransitionTo: function(transition){
            var user = SessionStore.getUser();
            if(!user){
                transition.redirect('entry');
            }
        }
    }
};

module.exports = Authentication;