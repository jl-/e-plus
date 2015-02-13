(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/components/playground.jsx":[function(require,module,exports){
//////////////////////////
/// playground for the app
////////////////////////////////////
var PlayGround = React.createClass({displayName: "PlayGround",
    render: function(){
        return (
            React.createElement("div", {className: "playground"}, this.props.children)
        );
    }
});
module.exports = PlayGround;

},{}],"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/components/props-attrs.jsx":[function(require,module,exports){
//////////////////////
/// this.props.attr
////////////////////////////
var TestPropsAttr = React.createClass({displayName: "TestPropsAttr",
    render: function(){
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, React.createElement("code", null, "this.props.attr")), 
                React.createElement("p", null, this.props.attr)
            )
        );
    }
});
module.exports = TestPropsAttr;
},{}],"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/components/props-children.jsx":[function(require,module,exports){
/////////////////////
/// this.props.children
////////////////////////////
var TestPropsChildren = React.createClass({displayName: "TestPropsChildren",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, React.createElement("code", null, "this.props.children")), 
                React.createElement("div", {className: "children-1"}, this.props.children)
            )
        );
    }
});
module.exports = TestPropsChildren;

},{}],"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/playground.jsx":[function(require,module,exports){
//////////////////////////
/// playground for the app
////////////////////////////////////
var TestPropsChildren = require('./components/props-children.jsx');
var TestPropsAttr = require('./components/props-attrs.jsx');
var PlayGround = require('./components/playground.jsx');
React.render(
    React.createElement(PlayGround, null, 
        React.createElement(TestPropsChildren, null, 
            React.createElement("h3", null, "children title"), 
            React.createElement("div", {className: "children-2"}, 
                React.createElement("h5", null, "children content")
            )
        ), 
        React.createElement(TestPropsAttr, {attr: "value of this.props.attr."})
    ),
    document.getElementById('app')
);

},{"./components/playground.jsx":"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/components/playground.jsx","./components/props-attrs.jsx":"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/components/props-attrs.jsx","./components/props-children.jsx":"/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/components/props-children.jsx"}]},{},["/Users/jl/workspace/web/github/jl-/e-plus/scripts/src/react/playground.jsx"]);
