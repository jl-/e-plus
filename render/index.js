var React = require('react');

require('node-jsx').install();
var app = require('../src/react/components/app.jsx');


module.exports = React.renderToString(app({}));
