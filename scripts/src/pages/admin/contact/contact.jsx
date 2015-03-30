/**
 *
 * Created by jl on 2/21/15.
 */
var React = require('react/addons');

var ServerRequestActionCreators = require('../../../actions/ServerRequestActionCreators');
var ContactStore = require('../../../stores/ContactStore');
var CheckableRow = require('../../../components/app/checkable-row.jsx');
var SearchFilter = require('../../../components/app/search-filter.jsx');

function getContactFromStore(){
    return {
        archive: ContactStore.getArchive(),
        selected: []
    };
}
var Contact = React.createClass({
    getInitialState: function(){
        return getContactFromStore();
    },
    componentWillMount: function(){
        if(!this.state.archive){
            console.log('c');
            ServerRequestActionCreators.requestContacts();
        }
    },
    componentDidMount: function(){
        ContactStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        ContactStore.removeChangeListener(this.onChange);
    },
    render: function(){

        var Menu = null;
        var View = null;
        var self = this;

        if(this.state.selected.length > 0){
            Menu =
                <div className="flex-row start ptb plr-sm table-header">
                    <input type="checkbox" checked={this.state.selectAll} onChange={this.triggerAllSelection}/>
                    <div className="m-0">
                        <span className="label label-primary pointer ml-lg" onClick={this.deleteContacts}>删除</span>
                    </div>
                </div>;
        }else{
            Menu =
                <div className="flex-row start ptb plr-sm table-header">
                    <input type="checkbox" onChange={this.triggerAllSelection}/>
                    <span className="flex-1 ml text-left">联系人姓名</span>
                    <span className="flex-2 text-left">手机</span>
                </div>;
        }





        console.log(this.state);
        if(this.state.archive){
            var names = Object.keys(this.state.archive);
            View = names.map(function (name) {
                var list = this.state.archive[name] || [];
                var Items = list.map(function(contact){
                    return (
                        <CheckableRow className={'full-row flex-row between read'} preChecked={self.state.selected.indexOf(contact._id) !== -1} key={contact._id} data={contact} onSelectChanged={self.onContactSelectChanged}>
                            <div className="flex-1 ml text-left">{contact.name}</div>
                            <div className="flex-2 text-left">{contact.phone}</div>
                        </CheckableRow>
                    );
                });
                return (
                    <div key={name} className="panel panel-primary">
                        <div className="panel-heading pointer pr flex-row between" onClick={self.toggleArchiveStatus}><span>{name + ' (' + list.length + ')'}</span><span className="fa fa-caret-right"></span></div>
                        <div className="panel-body">
                            {Items}
                        </div>
                    </div>
                );
            }, this);
        }else{
            View =
                <div>
                </div>;
        }





        return (
            <div className="plr-extra center-block full-row">
                <div className="text-center w-10 ptb-lg bb light">
                    <div className="bb mb light w-10">
                        <SearchFilter placeholder="姓名｜手机号码" onFilterChange={this.filterContact} onFilterClear={this.onContactFilterClear}></SearchFilter>
                    </div>
                    <div className="center-block w-8 full-row">
                    {Menu}
                    {View}
                    </div>
                </div>
            </div>
        );
    },
    onChange: function(){
        this.setState(getContactFromStore());
    },

    toggleArchiveStatus: function(event){
        var target = event.currentTarget;
        var body = target.nextElementSibling;
        if(target.classList.contains('panel-heading')){
            if(body.classList.contains('open')){
                target.lastChild.classList.add('fa-caret-right');
                target.lastChild.classList.remove('fa-caret-down');
                body.style.height = 0;
            }else{
                target.lastChild.classList.remove('fa-caret-right');
                target.lastChild.classList.add('fa-caret-down');
                body.style.height = body.scrollHeight + 'px';
            }
            body.classList.toggle('open');
        }
    },

    triggerAllSelection: function(event){
        var checked = event.target.checked;
        var selectedIds = [];
        if(checked){
            var items = this.state.archive;
            var list = null;

            if(items){
                for(var name in items){
                    list = items[name];
                    selectedIds = list.map(function(contact){
                        return contact._id;
                    }).concat(selectedIds);
                }
            }
        }
        this.setState({
            selectAll: checked,
            selected: selectedIds
        });
    },
    deleteContacts: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.deleteContacts(this.state.selected.join('|'));
        }
    },

    onContactSelectChanged: function(selected,id){
        var selectedIds = this.state.selected;
        if(selected){
            selectedIds.push(id);
        } else {
            selectedIds.splice(selectedIds.indexOf(id),1);
        }
        this.setState({
            selected: selectedIds
        });
        console.log(this.state.selected);
    },
    filterContact: function(){

    },
    onContactFilterClear: function(){

    }
});

module.exports = Contact;
