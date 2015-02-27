/**
 * Created by jl on 2/23/15.
 */


/**
 *
 * <Accordion multiActive=Boolean dataSource=Array onSelect=Func>
 *     <AccordionGroup>
 *         <AccordionGroupHeader>
 *
 *         </AccordionGroupHeader>
 *         <AccordionGroupContent>
 *
 *         </AccordionGroupContent>
 *     </AccordionGroup>
 * </Accordion>
 *
 *
 */

var React = require('react/addons');

var Accordion = React.createClass({
    displayName: 'Accordion',
    render: function(){

        var Group = this.props.children;
        var groupsData = this.props.groups;

        var Groups = null;


        Groups = groupsData.map(function(group){
            return React.addons.cloneWithProps(Group,{
                group: group,
                key: group && group.key
            });
        });
        console.log('/// Groups:');
        console.log(Groups);
        return (
            <div className="panel-group">
            {Groups}
            </div>
        );
    }
});

module.exports = Accordion;
