var React = require('react');
var PlayGround = React.createClass({
    render: function(){
        return (
            <div className="playground">{this.props.children}</div>
        );
    }
});
module.exports = PlayGround;
