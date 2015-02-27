/**
 * Created by jl on 2/19/15.
 */
var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Authentication = require('../../mixins/Authentication');

var SessionStorage = require('../../stores/SessionStore');


function getUserFromStore(){
    return SessionStorage.getUser();
}

var Admin = React.createClass({
    mixins: [Authentication],
    getInitialState: function(){
        return {
            user:  getUserFromStore()
        };
    },
    render: function(){
        var user = this.state.user;
        var phone = user.phone;
        return (
            <div className="cover pt-extra">
                <div className="admin-menu flex-row between">
                    <div>
                        <label>{phone}</label>
                    </div>
                    <ul className="nav nav-tabs">
                        <li>
                            <Link to="admin.message.unread">短信</Link>
                        </li>
                        <li>
                            <Link to="admin.call">通话</Link>
                        </li>
                        <li>
                            <Link to="admin.contact">通讯录</Link>
                        </li>
                        <li>
                            <Link to="admin.file">文件</Link>
                        </li>
                    </ul>
                </div>


                <RouteHandler></RouteHandler>
            </div>
        );
    }
});

module.exports = Admin;

