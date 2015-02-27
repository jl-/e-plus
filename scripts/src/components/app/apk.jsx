/**
 * Created by jl on 2/20/15.
 */
var React = require('react/addons');

var Apk = React.createClass({
    render: function(){
        var apkClass = this.props.className;
        return (
            <a href="" className={apkClass}>
                <span className="fa fa-android mr-lg"></span>
                Apk
            </a>
        );
    }
});


module.exports = Apk;