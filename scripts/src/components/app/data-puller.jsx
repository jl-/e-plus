/**
 * Created by jl on 2/20/15.
 */
var React = require('react/addons');

var DataPuller = React.createClass({
    render: function(){
        var btnClass = 'btn btn-primary';
        return (
            <button className={btnClass}>
                获取新数据
            </button>
        );
    }
});


module.exports = DataPuller;