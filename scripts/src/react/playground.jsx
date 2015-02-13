//////////////////////////
/// playground for the app
////////////////////////////////////
var TestPropsChildren = require('./components/props-children.jsx');
var TestPropsAttr = require('./components/props-attrs.jsx');
var PlayGround = require('./components/playground.jsx');
React.render(
    <PlayGround>
        <TestPropsChildren>
            <h3>children title</h3>
            <div className="children-2">
                <h5>children content</h5>
            </div>
        </TestPropsChildren>
        <TestPropsAttr attr="value of this.props.attr." />
    </PlayGround>,
    document.getElementById('app')
);
