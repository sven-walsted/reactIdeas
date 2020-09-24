const React = require('react')
const ReactDOM = require('react-dom')

const StatelessButton = (props) =>
    <button onClick={props.handleClick}>{props.buttonLabel}</button>;

module.exports = StatelessButton