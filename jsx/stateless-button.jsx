const React = require('react')
const ReactDOM = require('react-dom')

const Button = (props) =>
    <button type='button'
        className='btn-default btn'
        onClick={props.handleClick}
        value={props.recordId} >{props.buttonLabel}
    </button>;

module.exports = Button