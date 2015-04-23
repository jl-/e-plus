/**
 *
 * Created by jl on 2/21/15.
 */
var React = require('react/addons');




var ViewActionCreators = require('../../../actions/ViewActionCreators');
var ServerRequestActionCreators = require('../../../actions/ServerRequestActionCreators');
var MessageStore = require('../../../stores/MessageStore');


var CheckableRow = require('../../../components/app/checkable-row.jsx');
var SearchFilter = require('../../../components/app/search-filter.jsx');

function getMessageFromStore(){
    return {
        list: MessageStore.getList(),
        unreadList: MessageStore.getUnread(),
        archive: MessageStore.getArchive(),
        view: MessageStore.getView(),
        selected: []
    };
}


var Message = React.createClass({
    getInitialState: function(){
        return getMessageFromStore();
    },
    componentWillMount: function(){
        if(!this.state.list || !this.state.archive){
            ServerRequestActionCreators.requestMessages();
        }
    },
    componentDidMount: function(){
        MessageStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        MessageStore.removeChangeListener(this.onChange);
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
                        <span className="label label-primary pointer ml-lg" onClick={this.deleteMessages}>删除</span>
                        <span className="label label-primary pointer ml-lg" onClick={this.markMessagesAsRead}>标记为已读</span>
                        <span className="label label-primary pointer ml-lg" onClick={this.markMessagesAsUnread}>标记为未读</span>
                    </div>
                </div>;
        }else{
            Menu =
                <div className="flex-row start ptb plr-sm table-header">
                    <input type="checkbox" onChange={this.triggerAllSelection}/>
                    <span className="flex-1 ml text-left">发送者</span>
                    <span className="flex-2 text-left">内容</span>
                    <span className="flex-1 text-left">时间</span>
                </div>;
        }

        (this.state.unreadList || []).forEach(function(item){
            if(item.status === 'P') unreadCount++;
        });

        if(this.state.view === 'archive'){
            archiveClass += ' active';
            if(this.state.archive){
                View = this.state.archive.map(function (archive) {
                    var Items = archive.items.map(function(message){
                        return (
                            <CheckableRow className={'full-row flex-row between ' + (message.status === 'P' ? 'unread' : 'read')} preChecked={self.state.selected.indexOf(message._id) !== -1} key={message._id} data={message} onSelectChanged={self.onMessageSelectChanged}>
                                <div className="flex-1 ml text-left">{message.sender_phone + ' ' +  message.sender_name}</div>
                                <div className="flex-2 text-left">{message.content}</div>
                                <div className="flex-1 text-left">{(new Date(message.date)).toLocaleString()}</div>
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
                View = this.state.unreadList.map(function (message) {
                    var date = (new Date(message.date)).toLocaleString();
                    return (
                        <CheckableRow className={'full-row flex-row between ' + (message.status === 'P' ? 'unread' : 'read')} preChecked={self.state.selected.indexOf(message._id) !== -1} key={message._id} data={message} onSelectChanged={self.onMessageSelectChanged}>
                            <div className="flex-1 ml text-left">{message.sender_phone + ' ' + message.sender_name}</div>
                            <div className="flex-2 text-left">{message.content}</div>
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
            <div className="plr-extra full-row">
                <div className="text-center w-10 ptb-lg">
                    <div className="btn-group w-5">
                        <label className={unreadClass} data-view="unread" onClick={this.switchView}>未读短信<span className="badge ml-lg text-danger">{unreadCount}</span></label>
                        <label className={archiveClass} data-view="archive" onClick={this.switchView}>归档<span className="badge ml-lg">{this.state.list ? this.state.list.length : 0}</span></label>
                    </div>

                    <SearchFilter placeholder="姓名｜手机号码｜短信内容" onFilterChange={this.filterMessage} onFilterClear={this.onMessageFilterClear}></SearchFilter>

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
        this.setState(getMessageFromStore());
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
                ServerRequestActionCreators.requestMessages({
                    archive: true
                });
            }
            ViewActionCreators.changeMessageView(view);
        }
    },
    onMessageSelectChanged: function(selected,id){
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
            selectedIds = items.map(function(message){
                return message._id;
            });
        }
        this.setState({
            selectAll: checked,
            selected: selectedIds
        });
    },
    deleteMessages: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.deleteMessages(this.state.selected.join('|'));
        }
    },
    markMessagesAsRead: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.changeMessagesStatus(this.state.selected.join('|'), 'R');
        }
    },
    markMessagesAsUnread: function(){
        if(this.state.selected.length > 0){
            ServerRequestActionCreators.changeMessagesStatus(this.state.selected.join('|'), 'P');
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
    filterMessage: function(term){
        var view = this.state.view;
        if(term.length == 0){
            return this.setState(getMessageFromStore());
        }
        if(view === 'unread'){
            this.setState({
                unreadList: (MessageStore.getUnread() || []).filter(function(msg){
                    return msg.sender_name.indexOf(term) !== -1 || msg.sender_phone.indexOf(term) !== -1 || msg.content.indexOf(term) !== -1;
                })
            })
        }else{

        }
    },
    onMessageFilterClear: function(){
        this.setState(getMessageFromStore());
    }
});

module.exports = Message;
