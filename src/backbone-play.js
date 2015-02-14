/**
 * Created by jl on 2/3/15.
 */

///////////////////////////
/// Model
//////////////////////////////
var VCard = Backbone.Model.extend({
    defaults: {
        name: 'jl'
    },
    constructor: function(options){
        Backbone.Model.apply(this,arguments);

        // custom operations
    },
    setWidth: function(){
        var width = prompt('width:');
        this.set({
            width: width
        });
    }
});

window.vcard = new VCard({
    color: 'red'
});
window.vcard2 = new VCard;

vcard.on('change:width',function(model,width){
    console.log('got change of width:');
    console.log(model);
    console.log(width);
});
//vcard.setWidth();
