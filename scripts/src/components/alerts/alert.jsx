/**
 *
 * Created by jl on 2/20/15.
 */
var React = require('react/addons');


/// <Alert  state="danger|warning|info|success" className="custom-class">
//      <span>Cong!</span>
// </Alert>
var Alert = React.createClass({
    render: function(){
        var alert = null;
        var alertType;
        var alertClass;


        if(this.props.show){
            alertType = this.props.type;

            alertClass = 'alert alert-' + alertType;
            alertClass = this.props.className ? alertClass + ' ' + this.props.className : alertClass;


            alert = <div className={alertClass} role="alert">
                        {this.props.children}
                    </div>;
        }
        return (
            alert
        );
    }
});

module.exports = Alert;
