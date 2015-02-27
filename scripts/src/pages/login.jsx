/**
 *
 * Created by jl on 2/19/15.
 */

var React = require('react/addons');
var Router = require('react-router');


var PaperInput = require('../components/forms/elements/paper-input.jsx');
var ReactiveSubmit = require('../components/forms/elements/reactive-submit');
var Intro = require('../components/app/intro.jsx');
var Logo = require('../components/app/logo.jsx');
var Apk = require('../components/app/apk.jsx');
var Alert = require('../components/alerts/alert.jsx');

var ServerRequestActionCreators = require('../actions/ServerRequestActionCreators');
var SessionStore = require('../stores/SessionStore');


function getUserInfoFromStore(){
    return SessionStore.getUser();
}
function getLoginError(){
    return SessionStore.getError();
}


var Login = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function(){
        return {
            loginState: 'disabled'
            // phone
            // password
        };
    },
    componentDidMount: function(){
        SessionStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        SessionStore.removeChangeListener(this.onChange);
    },
    render: function(){

        var btnState = this.state.loginState;
        var btnDisplayText = btnState === 'pending' ? 'Login...' : 'Login';

        var loginFormClass = React.addons.classSet({
            'login-form': true,
            'w-3': true,
            'wobble': !!this.state.error
        });

        var alertContent = this.state.error;
        var shouldShowAlert = !!alertContent;
        var alertType = 'danger';
        if(shouldShowAlert) {
        }

        return (
            <div className="cover bg-primary flex-column">
                <div className="full-row flex-row around flex-1">
                    <div>
                        <figure className="flex-row start mb-extra">
                            <Logo></Logo>
                            <figcaption>
                                <h1><span className="fa fa-quote-left mr-lg"></span>Easy Info</h1>
                            </figcaption>
                        </figure>
                        <Intro></Intro>
                    </div>
                    <form className={loginFormClass}>
                        <PaperInput type="text" className="full-row" label="Phone" hint="*phone number" validator={this.phoneValidator}></PaperInput>
                        <PaperInput type="password" className="full-row" label="Password" validator={this.passwordValidator}></PaperInput>
                        <Alert type={alertType} show={shouldShowAlert}>
                        {alertContent}
                        </Alert>
                        <ReactiveSubmit className="full-row btn-primary" displayText={btnDisplayText} handler={this.handleLogin}  state={btnState}></ReactiveSubmit>
                    </form>
                </div>
                <Apk className="btn btn-raised mtb-extra bg-white"></Apk>
            </div>
        );
    },
    phoneValidator: function(phone){
        var result = true;
        var reg = /^1[0-9]{10}$/;

        var state = {};
        state.error = null;

        if(!reg.test(phone)){
            result = 'invalid phone number!';
            state.phone = undefined;
            state.loginState = 'disabled';
        }else{
            state.phone = phone;
            if(this.state.password){
                state.loginState = 'normal';
            }
        }

        this.setState(state);
        return result;
    },
    passwordValidator: function(password){
        var result = true;
        var state = {};
        state.error = null;

        if(!password || password.trim().length < 5){
            result = 'password length < 5';
            state.password = undefined;
            state.loginState = 'disabled';
        }else{
            state.password = password;
            if(this.state.phone){
                state.loginState = 'normal';
            }
        }
        this.setState(state);
        return result;
    },
    handleLogin: function(){
        this.setState({
            loginState: 'pending'
        });
        ServerRequestActionCreators.requestLogin({
            phone: this.state.phone,
            password: this.state.password
        });
    },
    onChange: function(){
        var user = getUserInfoFromStore();

        if(user){
            this.setState({
                loginState: 'normal'
            });
            this.transitionTo('admin.message');
        }else{
            this.setState({
                loginState: 'disabled',
                error: getLoginError()
            });
            console.log(this.state);
        }
    }
});

module.exports = Login;
