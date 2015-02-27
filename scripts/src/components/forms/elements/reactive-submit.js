var React = require('react/addons');

var ReactiveSubmit = React.createClass({
    render: function(){
        var btnText = this.props.displayText;
        var clickHandler = this.props.handler;
        var state = this.props.state;

        var btnClass = 'btn';
        var isBtnDisabled = state === 'disabled' ? 'disabled' : '';
        var spinner = null;


        btnClass = this.props.className ? btnClass + ' ' + this.props.className : btnClass;



        if(state === 'pending'){
            isBtnDisabled = 'disabled';
            spinner = <span className="fa fa-spin fa-spinner mr"></span>;
        }

        return (
            <button className={btnClass} disabled={isBtnDisabled} onClick={clickHandler}>
            {spinner}
            {btnText}
            </button>
        );
    }
});

module.exports = ReactiveSubmit;