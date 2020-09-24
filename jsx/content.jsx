const React = require('react')
const ReactDOM = require('react-dom')

const Form = require('./form.jsx')
const List = require('./list.jsx')
const StatelessButton = require('./stateless-button.jsx')

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      displayList: true,
      buttonLabel: 'Edit'
    }
  }
  handleClick(event) {
    console.log("Handling displayList from Parent: " + this.state.displayList)
    this.setState({
      displayList: ((this.state.displayList) ? false : true),
      buttonLabel: ((this.state.displayList) ? 'List' : 'Edit')
    })
  }
  componentDidMount() {
    console.log("componentDidMount...")
  }
  render() {
    if (this.state.displayList)
      return <div><List /><StatelessButton handleClick={this.handleClick} buttonLabel={this.state.buttonLabel} /></div>
    else
      return <div><Form /><StatelessButton handleClick={this.handleClick} buttonLabel={this.state.buttonLabel} /></div>;
  }
}

module.exports = Content