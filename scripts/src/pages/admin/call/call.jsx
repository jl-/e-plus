/**
 *
 * Created by jl on 2/21/15.
 */
var React = require('react/addons');




var ViewActionCreators = require('../../../actions/ViewActionCreators');
var ServerRequestActionCreators = require('../../../actions/ServerRequestActionCreators');
var CallStore = require('../../../stores/CallStore');


var CheckableRow = require('../../../components/app/checkable-row.jsx');
var SearchFilter = require('../../../components/app/search-filter.jsx');

function getCallFromStore(){
    return {
        list: CallStore.getList(),
        unreadList: CallStore.getUnread(),
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
                <div className="flex-row start ptb plr-sm table-header">
                    <input type="checkbox" checked={this.state.selectAll} onChange={this.triggerAllSelection}/>
                    <div className="m-0">
                        <span className="label label-primary pointer ml-lg" onClick={this.deleteCalls}>删除</span>
                        <span className="label label-primary pointer ml-lg" onClick={this.markCallsAsRead}>标记为已读</span>
                        <span className="label label-primary pointer ml-lg" onClick={this.markCallsAsUnread}>标记为未读</span>
                    </div>
                </div>;
        }else{
            Menu =
                <div className="flex-row start ptb plr-sm table-header">
                    <input type="checkbox" onChange={this.triggerAllSelection}/>
                    <span className="flex-1 ml text-left">发送者</span>
                    <span className="flex-2 text-left">手机</span>
                    <span className="flex-1 text-left">时间</span>
                </div>;
        }

        (this.state.unreadList || []).forEach(function(item){
            if(item.status === 'P') unreadCount++;
        });

        if(this.state.view === 'archive'){
            archiveClass += ' active';
            console.log(this.state);
            if(this.state.archive){
                View = this.state.archive.map(function (archive) {
                    var Items = archive.items.map(function(call){
                        return (
                            <CheckableRow className={'full-row flex-row between ' + (call.status === 'P' ? 'unread' : 'read')} preChecked={self.state.selected.indexOf(call._id) !== -1} key={call._id} data={call} onSelectChanged={self.onCallSelectChanged}>
                                <div className="flex-1 ml text-left">{call.caller_name}</div>
                                <div className="flex-2 text-left">{call.caller_phone}</div>
                                <div className="flex-1 text-left">{(new Date(call.date)).toLocaleString()}</div>
                            </CheckableRow>
                        );
                    });
                    return (
                        <div key={archive.group} className="panel panel-primary">
                            <div className="panel-heading pointer flex-row between" onClick={self.toggleArchiveStatus}><span>{archive.group + ' (' + archive.items.length + ')'}</span><span className="fa fa-caret-right"></span></div>
                            <div className="panel-body">
                            {Items}
                            </div>
                        </div>
                    );
                });
            }else{
                View =
                    <div>
                    </div>;
            }
        }else{
            unreadClass += ' active';
            if(this.state.unreadList){
                View = this.state.unreadList.map(function (call) {
                    var date = (new Date(call.date)).toLocaleString();
                    return (
                        <CheckableRow className={'full-row flex-row between ' + (call.status === 'P' ? 'unread' : 'read')} preChecked={self.state.selected.indexOf(call._id) !== -1} key={call._id} data={call} onSelectChanged={self.onCallSelectChanged}>
                            <div className="flex-1 ml text-left">{call.caller_name}</div>
                            <div className="flex-2 text-left">{call.caller_phone}</div>
                            <div className="flex-1 text-left">{date}</div>
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
            <div className="plr-extra w-9 center-block full-row">
                <div className="text-center w-10 ptb-lg">
                    <div className="btn-group w-5">
                        <label className={unreadClass} data-view="unread" onClick={this.switchView}>未接来电<span className="badge ml-lg text-danger">{unreadCount}</span></label>
                        <label className={archiveClass} data-view="archive" onClick={this.switchView}>归档<span className="badge ml-lg">{this.state.list ? this.state.list.length : 0}</span></label>
                    </div>

                    <SearchFilter placeholder="姓名｜手机号码" onFilterChange={this.filterCall} onFilterClear={this.onCallFilterClear}></SearchFilter>

                    <div className="full-row">
                        <div className="full-row">
                            {Menu}
                            {View}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    onChange: function(){
        this.setState(getCallFromStore());
        console.log(this.state);
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
            if(view === 'archive' && !this.state.archive){
                ServerRequestActionCreators.requestCalls({
                    archive: true
                });
            }
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
            var items = this.state.view === 'archive' ? this.state.list : this.state.unreadList;
            selectedIds = items.map(function(call){
                return call._id;
            });
        }
        this.setState({
            selectAll: checked,
            selected: selectedIds
        });
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
    filterCall: function(term){

        var view = this.state.view;
        if(term.length == 0){
            return this.setState(getCallFromStore());
        }
        if(view === 'unread'){
            this.setState({
                unreadList: (CallStore.getUnread() || []).filter(function(call){
                    console.log(call);
                    return call.caller_name.indexOf(term) !== -1 || call.caller_phone.indexOf(term) !== -1;
                })
            })
        }
    },
    onCallFilterClear: function(){
        this.setState(getCallFromStore());
    }
});

module.exports = Call;
