const React = require('react')
const ReactDOM = require('react-dom')

const Form = require('./form.jsx')
const List = require('./list.jsx')

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }
  submit(event) {
    let emailAddress = this.refs.emailAddress
    let comments = this.refs.comments
    console.log(ReactDOM.findDOMNode(emailAddress).value)
    console.log(ReactDOM.findDOMNode(comments).value)
  }
  render() {
    if (true)
      return <List />
    else
      return <Form />;
  }
}

module.exports = Content