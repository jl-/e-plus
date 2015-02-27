var React = require('react/addons');

////////////
/// <PaperInput type="" label="" hint="" validator=>
//////////////////////
var PaperInput = React.createClass({
    getInitialState: function(){
        return {
            value: '',
            state: 'normal',
            error: null
        };
    },
    render: function(){
        if(!this.props.type){
            throw new TypeError('input type missing');
        }

        var label = this.props.label ?  <label className="paper-input-label">{this.props.label}</label> : null;
        var meta = this.props.hint || this.props.validator ? <span className="paper-input-meta">{this.state.error || this.props.hint}</span> : null;

        var wrapperClass = 'paper-input-wrapper';
        var inputClass = 'paper-input';

        wrapperClass = this.state.state !== 'normal' ? wrapperClass + ' ' + this.state.state : wrapperClass;
        inputClass = this.props.className ? inputClass + ' ' + this.props.className : inputClass;



        return (
            <div className={wrapperClass}>
                {label}
                <input className={inputClass} type={this.props.type} onFocus={this.onFocus} onBlur={this.onBlur} onChange={this.onChange}/>
                {meta}
            </div>
        );
    },
    onFocus: function(){
        if(this.state.value.trim().length === 0){
            this.setState({
                state: 'active'
            });
        }
    },
    onBlur: function(){
        if(this.state.value.trim().length === 0){
            this.setState({
                state: 'normal',
                error: null
            });
        }
    },
    onChange: function(e){
        var validator = this.props.validator;
        if(!validator) return;

        var input = e.target;
        var result = validator.call(input,input.value);

        this.setState({
            value: input.value,
            state: result === true ? 'active has-success' : 'active has-error',
            error: result === true ? null : result
        });
    }
});
module.exports = PaperInput;