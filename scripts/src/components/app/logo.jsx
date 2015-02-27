/**
 *
 * Created by jl on 2/20/15.
 */
var React = require('react/addons');
var CONFIG = require('../../configs/app-config');


var Logo = React.createClass({
    render: function(){
        var logoSrc = CONFIG.PATHS.ASSETS_ROOT + '/images/logo.png';
        var logoClass = this.props.className;
        return (
            <img src={logoSrc} className={logoClass}/>
        );
    }
});

module.exports = Logo;
