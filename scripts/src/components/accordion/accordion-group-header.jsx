/**
 * Created by jl on 2/23/15.
 */

var React = require('react/addons');

var AccordionGroupHeader = React.createClass({
    displayName: 'AccordionGroupHeader',
    render: function(){
        var children = this.props.children;
        var Children = null;

        var headerData = this.props.header;


        if(children){
            children = children instanceof Array ? children : [children];
            Children = children.map(function(child){
                return React.addons.cloneWithProps(child,headerData);
            });
        }

        console.log(Children);
        return (
            <div>
            {Children}
            </div>
        );
    }
});

module.exports = AccordionGroupHeader;

