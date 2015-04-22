/**
 * Created by jl on 2/19/15.
 */
var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var DataPuller = require('../../components/app/data-puller.jsx');

var Authentication = require('../../mixins/Authentication');

var ServerRequestActionCreators = require('../../actions/ServerRequestActionCreators');

var SessionStore = require('../../stores/SessionStore');
var ProfileStore = require('../../stores/ProfileStore');

var puller = require('../../utils/puller');


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
        //ServerRequestActionCreators.requestProfile();
        //ProfileStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        //ProfileStore.removeChangeListener(this.onChange);
    },
    render: function(){
        var profile = this.state.profile;
        return (
            <div className="cover pt-extra">
                <div className="admin-menu flex-row between">
                    <div className="label ptb-sm plr-sm center-block ml-extra label-primary">
                        <span >你好，{profile ? profile.phone : null}</span>
                        <label className="data-puller ml-lg mb-0 pointer" onClick={this.pullData}>
                            <span className="fa mr fa-refresh text-white" ref="pullerSpinner"></span>
                            <span ref="pullerText">同步数据</span>
                        </label>
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
    },
    pullData: function (event) {
        var profile = getProfileFromStore();

        var target = event.target;
        var pullerSpinner = this.refs.pullerSpinner.getDOMNode();
        var pullerText = this.refs.pullerText.getDOMNode();
        var toTopic = 'EaseInfo_Android_Subscribe/' + profile.phone;
        var onTopic = 'EaseInfo_Android_Publish/' + profile.phone;
        var ACTION = 'SMS_CALL_UPLOAD';
        pullerSpinner.classList.add('fa-spin');
        pullerText.textContent = '正在更新数据...';
        puller.subscribe(onTopic);
        puller.pull(toTopic, ACTION, onTopic, function (message) {
            ServerRequestActionCreators.requestMessages();
            ServerRequestActionCreators.requestCalls();
            setTimeout(function(){
                pullerSpinner.classList.remove('fa-spin');
                pullerText.textContent = message ? '成功同步数据.' : '更新超时，请重试';
            },3000);
        });
    }
});

module.exports = Admin;

