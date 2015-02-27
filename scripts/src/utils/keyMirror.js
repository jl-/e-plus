/**
 *
 * Created by jl on 2/19/15.
 */

module.exports = function(keys){
    var obj = {};
    keys = typeof keys === 'string' ? keys.split(',') : keys;
    if(keys instanceof Array){
        keys.forEach(function(key){
            obj[key] = key;
        });
    }
    return obj;
};
