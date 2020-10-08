const React = require('react')
const ReactDOM = require('react-dom')

const StatelessButton = (props) =>
    <button type='button' onClick={props.handleClick} value={props.id} >{props.buttonLabel}</button>;

module.exports = StatelessButton