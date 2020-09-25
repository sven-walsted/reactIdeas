const React = require('react')
const ReactDOM = require('react-dom')

const Form = require('./form.jsx')
const List = require('./list.jsx')
const StatelessButton = require('./stateless-button.jsx')

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayList: true,
      buttonLabel: 'Edit',
      handleClick: this.handleClick.bind(this)
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
    // This component's state becomes the children's properties
    if (this.state.displayList)
      return <div><List /><StatelessButton {...this.state} /></div>
    else
      return <div><Form /><StatelessButton {...this.state} /></div>;
  }
}

module.exports = Content