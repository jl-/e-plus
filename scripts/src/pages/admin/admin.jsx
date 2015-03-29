/**
 * Created by jl on 2/19/15.
 */
var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var mqtt = require('../../utils/mqtt');

var Authentication = require('../../mixins/Authentication');

var ServerRequestActionCreators = require('../../actions/ServerRequestActionCreators');

var SessionStore = require('../../stores/SessionStore');
var ProfileStore = require('../../stores/ProfileStore');


function getProfileFromStore(){
    return ProfileStore.getProfile();
}

var Admin = React.createClass({
    mixins: [Authentication],
    getInitialState: function(){
        return {
            profile:  getProfileFromStore()
        };
    },
    componentDidMount: function(){
        ServerRequestActionCreators.requestProfile();
        ProfileStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        ProfileStore.removeChangeListener(this.onChange);
    },
    render: function(){
        var profile = this.state.profile;
        return (
            <div className="cover pt-extra">
                <div className="admin-menu flex-row between">
                    <div>
                        <span className="label ml-extra label-primary pointer">你好，{profile ? profile.phone : null}</span>
                    </div>
                    <ul className="nav nav-tabs">
                        <li>
                            <Link to="admin.message">短信</Link>
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
    },
    onChange: function () {
        console.log('//// admin change listener, got profile from profileStore:');
        this.setState({
            profile: ProfileStore.getProfile()
        });
    }
});

module.exports = Admin;

