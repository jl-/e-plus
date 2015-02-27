/**
 * Created by jl on 2/23/15.
 */


var React = require('react/addons');

var AccordionGroup = React.createClass({
    displayName: 'AccordionGroup',
    render: function(){
        console.log('/// group props:');
        console.log(this.props);



        var GroupHeader = this.props.children[0];
        var GroupContent = this.props.children[1];

        console.log(GroupHeader);

        var groupData = this.props.group;

        console.log(groupData);

        GroupHeader = React.addons.cloneWithProps(GroupHeader,{
            header: groupData.header
        });
        GroupContent = React.addons.cloneWithProps(GroupContent,groupData.content);
        console.log('/// Header');
        console.log(GroupHeader);

        return (
            <div>
            {GroupHeader}
            </div>
        );
    }
});

module.exports = AccordionGroup;