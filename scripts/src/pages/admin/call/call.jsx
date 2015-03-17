/**
 *
 * Created by jl on 2/21/15.
 */
var React = require('react/addons');




var ViewActionCreators = require('../../../actions/ViewActionCreators');
var ServerRequestActionCreators = require('../../../actions/ServerRequestActionCreators');
var CallStore = require('../../../stores/CallStore');


var CheckableRow = require('../../../components/app/checkable-row.jsx');

function getCallFromStore(){
    return {
        list: CallStore.getList(),
        archive: CallStore.getArchive(),
        view: CallStore.getView(),
        selected: []
    };
}

var Call = React.createClass({
    getInitialState: function(){
        return getCallFromStore();
    },
    componentWillMount: function(){
        if(!this.state.list || !this.state.archive){
            ServerRequestActionCreators.requestCalls();
        }
    },
    componentDidMount: function(){
        CallStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        CallStore.removeChangeListener(this.onChange);
    },
    render: function(){

        var self = this;
        var View = null;
        var _viewClass = 'btn btn-primary w-5';
        var unreadClass = _viewClass;
        var archiveClass = _viewClass;
        var Menu = null;
        var unreadCount = 0;


        if(this.state.selected.length > 0){
            Menu =
                <div className="flex-row start ptb plr-sm">
                    <input type="checkbox" checked={this.state.selectAll} onChange={this.triggerAllSelection}/>
                    <div className="m-0">
                        <span className="label label-primary pointer ml-lg" onClick={this.markCallsAsRead}>标记为已读</span>
                        <span className="label label-primary pointer ml-lg" onClick={this.markCallsAsUnread}>标记为未读</span>
                    </div>
                </div>;
        }else{
            Menu =
                <div className="flex-row start ptb plr-sm">
                    <input type="checkbox" onChange={this.triggerAllSelection}/>
                    <span className="flex-1 ml">拨号者姓名</span>
                    <span className="flex-2">拨号者电话</span>
                    <span className="flex-1">时间</span>
                </div>;
        }

        (this.state.list || []).forEach(function(item){
            if(item.status === 'P') unreadCount++;
        });

        if(this.state.view === 'archive'){
            archiveClass += ' active';
            if(this.state.archive){
                this.state.archive.forEach(function (message) {

                });
            }else{
                View =
                    <div>
                    </div>;
            }
        }else{
            unreadClass += ' active';
            if(this.state.list){
                View = this.state.list.map(function (call) {
                    var date = (new Date(call.date)).toLocaleString();
                    return (
                        <CheckableRow className={'full-row flex-row between ' + (call.status === 'P' ? 'unread' : 'read')} preChecked={self.state.selected.indexOf(call._id) !== -1} key={call._id} data={call} onSelectChanged={self.onCallSelectChanged}>
                            <span className="flex-1 ml">{call.caller_name || '未命名'}</span>
                            <span className="flex-2">{call.caller_phone}</span>
                            <span className="flex-1">{date}</span>
                        </CheckableRow>
                    );
                });
            }else{
                View =
                    <div>
                    </div>;
            }
        }


        return (
            <div className="plr-extra full-row">
                <div className="text-center w-10 ptb-lg bb light">
                    <div className="btn-group w-5">
                        <label className={unreadClass} data-view="unread" onClick={this.switchView}>未接来电<span className="badge ml-lg">{unreadCount}</span></label>
                        <label className={archiveClass} data-view="archive" onClick={this.switchView}>归档</label>
                    </div>
                </div>
                <div className="full-row">
                    <div className="full-row">
                        {Menu}
                        {View}
                    </div>
                </div>
            </div>
        );
    },
    onChange: function(){
        this.setState(getCallFromStore());
    },
    switchView: function(event){
        var view = event.target.attributes.getNamedItem('data-view');
        view = view && view.value || 'unread';
        if(view !== this.state.view){
            this.setState({
                view: view,
                selectAll: false,
                selected: []
            });
            ViewActionCreators.changeCallView(view);
        }
    },
    onCallSelectChanged: function(selected,id){
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
    triggerAllSelection: function(event){
        var checked = event.target.checked;
        var selectedIds = [];
        if(checked){
            selectedIds = this.state.list.map(function(call){
                return call._id;
            });
        }
        this.setState({
            selectAll: checked,
            selected: selectedIds
        });
        console.log(this.state.selected);
    },
    deleteCalls: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.deleteCalls(this.state.selected.join('|'));
        }
    },
    markCallsAsRead: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.changeCallsStatus(this.state.selected.join('|'), 'R');
        }
    },
    markCallsAsUnread: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.changeCallsStatus(this.state.selected.join('|'), 'P');
        }
    }
});

module.exports = Call;
