var React = require('react');

var TestPropsChildren = require('./props-children.jsx');
var TestPropsAttr = require('./props-attrs.jsx');
var PlayGround = require('./playground.jsx');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var App = React.createClass({
    render: function(){
        return (
            <div>
                <PlayGround>
                    <TestPropsChildren>
                        <h3>children title</h3>
                        <div className="children-2">
                            <h5>children content</h5>
                        </div>
                    </TestPropsChildren>
                    <TestPropsAttr attr="value of this.props.attr." />
                </PlayGround>
            </div>
        );
    }
});


module.exports = App;
