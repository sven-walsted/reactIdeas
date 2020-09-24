const React = require('react')
const ReactDOM = require('react-dom')

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event) {
        console.log(this, event)
    }
    render() {
        return <button onClick={this.handleClick}>Click Me</button>
    }
}

module.exports = Button