/**
 *
 * Created by jl on 2/26/15.
 */

var React = require('react/addons');


var CheckableRow = React.createClass({
    getInitialState: function(){
        return {

        };
    },
    render: function(){
        var checked;
        if(this.props.preChecked !== this.props._preChecked){
            this.props._preChecked = this.props.preChecked;
            checked = this.props.preChecked;
        }else{
            checked = this.state.checked;
        }
        var rowClass = checked ? 'active' : '';
        if(this.props.className) rowClass = rowClass + ' ' + this.props.className;
        //return (
        //    <tr className={rowClass}>
        //        <td><input type="checkbox" checked={checked} onChange={this.onChange}/></td>
        //        {this.props.children}
        //    </tr>
        //);
        return (
            <div className={rowClass}>
                <input type="checkbox" checked={checked} onChange={this.onChange}/>
                {this.props.children}
            </div>
        );
    },
    onChange: function(event){
        var checked = event.target.checked;
        this.setState({
            checked: checked
        });
        if(this.props.onSelectChanged){
            this.props.onSelectChanged(checked,this.props.data._id);
        }
    }
});

module.exports = CheckableRow;
