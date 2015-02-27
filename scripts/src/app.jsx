/**
 *
 * Created by jl on 2/19/15.
 */
var React = require('react/addons');


var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


/// pages
var Login = require('./pages/login.jsx');
var Admin = require('./pages/admin/admin.jsx');
var Call = require('./pages/admin/call/call.jsx');

var Message = require('./pages/admin/message/message.jsx');


var Contact = require('./pages/admin/contact/contact.jsx');
var File = require('./pages/admin/file/file.jsx');


/// App
var App = React.createClass({
    render: function(){
        return (
            <div className="cover">
                <RouteHandler/>
            </div>
        );
    }
});


//// routes
var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="entry" path="/login" handler={Login}>
        </Route>
        <DefaultRoute handler={Login}></DefaultRoute>
        <Route name="admin" path="/admin" handler={Admin}>
            <Route name="admin.message" path="/message" handler={Message}></Route>
            <Route name="admin.call" path="/call" handler={Call}></Route>
            <Route name="admin.contact" path="/contact" handler={Contact}></Route>
            <Route name="admin.file" path="/file" handler={File}></Route>
        </Route>
        <NotFoundRoute handler={Login}></NotFoundRoute>
    </Route>
);
setTimeout(function () {
    Router.run(routes, function (Handler) {
        React.render(<Handler/>, document.getElementById('app'));
    });
},400);


/// for dev
window.React = React;

module.exports = App;

