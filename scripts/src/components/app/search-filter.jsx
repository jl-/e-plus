/**
 * Created by jl on 2/20/15.
 */
var React = require('react/addons');

var SearchFilter = React.createClass({
    getInitialState: function(){
        return {
            term: ''
        };
    },
    render: function(){
        var placeholder = this.props.placeholder;
        var inputStyle = {
            borderRadius: '4px'
        };
        var clearBtnStyle = {
            visibility: this.state.term ? 'visible' : 'hidden'
        };

        return (
            <div className="input-group container-clip center-block w-4 mtb filter-component">
                <label className="control-label sr-only">Hidden label</label>
                <input type="text" className="form-control" style={inputStyle} ref="filter" placeholder={placeholder} onChange={this.onChange} />
                <span style={clearBtnStyle} className="glyphicon glyphicon-remove form-control-feedback pointer" onClick={this.clear}></span>
            </div>
        );
    },
    onChange: function(event){
        var target = event.target;
        var term = target.value;

        this.setState({
            term: term
        });

        if(this.props.onFilterChange) {
            this.props.onFilterChange(term,target);
        }
    },
    clear: function(){
        var input = this.refs.filter.getDOMNode();
        input.value = '';
        this.setState({
            term: ''
        });
        if(this.props.onFilterClear) {
            this.props.onFilterClear();
        }
    }
});


module.exports = SearchFilter;