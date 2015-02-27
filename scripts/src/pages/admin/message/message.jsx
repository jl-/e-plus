/**
 *
 * Created by jl on 2/21/15.
 */
var React = require('react/addons');




var ServerRequestActionCreators = require('../../../actions/ServerRequestActionCreators');
var MessageStore = require('../../../stores/MessageStore');


function getMessageFromStore(){
    return {
        list: MessageStore.getList(),
        archive: MessageStore.getArchive()
    };
}

var Message = React.createClass({
    getInitialState: function(){
        return getMessageFromStore();
    },
    componentWillMount: function(){
        if(!this.state.list || !this.state.archive){
            ServerRequestActionCreators.requestMessage();
        }
    },
    componentDidMount: function(){
        MessageStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function(){
        MessageStore.removeChangeListener(this.onChange);
    },
    render: function(){
        return (
            <div className="plr-extra">
                <div className="text-center w-10 ptb-lg bb light">
                    <div className="btn-group w-5">
                        <label className="btn btn-primary w-5" onClick={this.switchView}>未读短信 <span className="badge ml-lg">1</span></label>
                        <label className="btn btn-primary w-5" onClick={this.switchView}>归档</label>
                    </div>
                </div>
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <td className="">{'#'}</td>
                                <td className="w-2">发送者</td>
                                <td className="w-6">内容</td>
                                <td className="w-1">时间</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        );
    },
    onChange: function(){
        console.log('/// message change event!');
        this.setState(getMessageFromStore());
    },
    switchView: function(view){
        console.log(view);
    }
});

module.exports = Message;
