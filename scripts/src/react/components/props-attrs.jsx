//////////////////////
/// this.props.attr
////////////////////////////
var TestPropsAttr = React.createClass({
    render: function(){
        return (
            <div>
                <h1><code>this.props.attr</code></h1>
                <p>{this.props.attr}</p>
            </div>
        );
    }
});
module.exports = TestPropsAttr;