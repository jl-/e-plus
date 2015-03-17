/**
 *
 * Created by jl on 2/21/15.
 */
var React = require('react/addons');




var ViewActionCreators = require('../../../actions/ViewActionCreators');
var ServerRequestActionCreators = require('../../../actions/ServerRequestActionCreators');
var MessageStore = require('../../../stores/MessageStore');


var CheckableRow = require('../../../components/app/checkable-row.jsx');

function getMessageFromStore(){
    return {
        list: MessageStore.getList(),
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
                <tr>
                    <td className=""><input type="checkbox" checked={this.state.selectAll} onChange={this.triggerAllSelection}/></td>
                    <td colSpan="3">
                        <div className="m-0">
                            <span className="label label-primary pointer ml-lg" onClick={this.markMessagesAsRead}>标记为已读</span>
                            <span className="label label-primary pointer ml-lg" onClick={this.markMessagesAsUnread}>标记为未读</span>
                        </div>
                    </td>
                </tr>;
        }else{
            Menu =
                <tr>
                    <td className=""><input type="checkbox" onChange={this.triggerAllSelection}/></td>
                    <td className="w-2">发送者</td>
                    <td className="w-6">内容</td>
                    <td className="w-2">时间</td>
                </tr>;
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
                    <tr>
                    </tr>;
            }
        }else{
            unreadClass += ' active';
            if(this.state.list){
                View = this.state.list.map(function (message) {
                    var date = (new Date(message.date)).toLocaleString();
                    return (
                        <CheckableRow className={message.status === 'P' ? 'unread' : 'read'} preChecked={self.state.selected.indexOf(message._id) !== -1} key={message._id} data={message} onSelectChanged={self.onMessageSelectChanged}>
                            <td className="w-2">{message.sender_phone}</td>
                            <td className="w-6">{message.content}</td>
                            <td className="w-2">{date}</td>
                        </CheckableRow>
                    );
                });
            }else{
                View =
                    <tr>
                    </tr>;
            }
        }


        return (
            <div className="plr-extra">
                <div className="text-center w-10 ptb-lg bb light">
                    <div className="btn-group w-5">
                        <label className={unreadClass} data-view="unread" onClick={this.switchView}>未读短信 <span className="badge ml-lg">{unreadCount}</span></label>
                        <label className={archiveClass} data-view="archive" onClick={this.switchView}>归档</label>
                    </div>
                </div>
                <div>
                    <table className="table table-hover">
                        <thead>
                        {Menu}
                        </thead>
                        <tbody>
                        {View}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    },
    onChange: function(){
        this.setState(getMessageFromStore());
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
            selectedIds = this.state.list.map(function(message){
                return message._id;
            });
        }
        this.setState({
            selectAll: checked,
            selected: selectedIds
        });
        console.log(this.state.selected);
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
    }
});

module.exports = Message;
