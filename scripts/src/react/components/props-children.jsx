/////////////////////
/// this.props.children
////////////////////////////
var TestPropsChildren = React.createClass({
    render: function() {
        return (
            <div>
                <h1><code>this.props.children</code></h1>
                <div className="children-1">{this.props.children}</div>
            </div>
        );
    }
});
module.exports = TestPropsChildren;
