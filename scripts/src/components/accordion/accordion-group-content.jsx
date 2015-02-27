/**
 *
 * Created by jl on 2/23/15.
 */

var React = require('react/addons');

var AccordionGroupContent = React.createClass({
    displayName: 'AccordionGroupContent',
    render: function(){
        return (
            <div>
            {this.props.children}
            </div>
        );
    }
});

module.exports = AccordionGroupContent;
