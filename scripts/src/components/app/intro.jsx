/**
 *
 * Created by jl on 2/20/15.
 */
var React = require('react/addons');

var Intro = React.createClass({
    render: function(){
        var introClass = this.props.className;
        return (
            <ul className={introClass}>
                <li>基于Android与Web的通信管理平台</li>
                <li>未接来电、未读短信云传，远程查看，不再错过任何业务</li>
                <li>通信录同步</li>
                <li>文件上传，云端存储</li>
                <li>...........</li>
            </ul>
        );
    }
});

module.exports = Intro;