const React = require('react')
const ReactDOM = require('react-dom')

const Form = require('./form.jsx')
const List = require('./list.jsx')
const StatelessButton = require('./stateless-button.jsx')

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.sendData = this.sendData.bind(this)
    // fields
    this.handleCommonChange = this.handleCommonChange.bind(this)
    this.handleFamilyChange = this.handleFamilyChange.bind(this)
    this.handleGenusChange = this.handleGenusChange.bind(this)
    this.handleSpeciesChange = this.handleSpeciesChange.bind(this)
    this.state = {
      displayList: true,
      buttonLabel: 'Add',
      handleClick: this.handleClick.bind(this),
      handleDeleteClick: this.handleDeleteClick.bind(this),
      fishes: [],
      commonName: '',
      familyName: '',
      genusName: '',
      speciesName: ''
    }
  }
  handleCommonChange(event) {
    this.setState({ commonName: event.target.value })
  }
  handleFamilyChange(event) {
    this.setState({ familyName: event.target.value })
  }
  handleGenusChange(event) {
    this.setState({ genusName: event.target.value })
  }
  handleSpeciesChange(event) {
    this.setState({ speciesName: event.target.value })
  }
  handleClick(event) {
    console.dir(event.target)
    this.setState({
      displayList: ((this.state.displayList) ? false : true),
      buttonLabel: ((this.state.displayList) ? 'List' : 'Add')
    })
  }
  handleDeleteClick(event) {
    console.log("Delete ID: " + event.target.value)
    this.deleteData(event.target.value)
  }
  handleKeyUp(event) {
    // This will submit form
    if (event.keyCode == 13) return this.sendData();
  }
  sendData() {
    const data = {
      className: 'Actinopterygii',
      orderName: 'Salmoniformes',
      familyName: 'Salmonidae',
      commonName: this.state.commonName,
      familyName: this.state.familyName,
      genusName: this.state.genusName,
      speciesName: this.state.speciesName
    }
    fetch('resources/fish', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        /**
         * Use Case 1: 
         * List -> Add
         * Create only -> List;
         * List -> Delete -> reload list
         */
        console.log(response.status)
        // if (201 == response.status) {
        //// then created and we can get id, 
        //// or refresh object,
        //// or set this fetch method to PUT.
        //// for update.
        // } 
        this.loadData()
        // Redo this
        this.setState({
          displayList: true,
          buttonLabel: 'Add'
        })
        this.clearField()
      })
      .catch((error) => {
        console.error(('Error', error));
      })
  }
  loadData() {
    fetch('resources/fish')
      .then((response) => response.json())
      .then((fishes) => {
        console.dir(fishes)
        this.setState({ fishes: fishes })
      })
  }
  deleteData(id) {
    fetch('resources/fish/' + id, {
      method: 'DELETE'
    })
      .then((response) => {
        console.log(response.status)
        this.loadData()
      })
      .catch((error) => {
        console.error(('Error', error));
      })
  }
  clearField() {
    this.setState({
      commonName: '',
      familyName: '',
      genusName: '',
      speciesName: ''
    })
  }
  componentDidMount() {
    console.log("componentDidMount...")
    this.loadData()
  }
  render() {
    if (this.state.displayList)
      return <div className="well"><StatelessButton {...this.state} /><List {...this.state} /></div>
    else
      return (
        <div className="well">
          <StatelessButton {...this.state} />
          <form onKeyUp={this.handleKeyUp} >
            <div className="grid-item">
              <label htmlFor='commonName'>Common Name</label>
              <input type='text'
                name='commonName'
                onChange={this.handleCommonChange}
                value={this.state.commonName} />
            </div>
            <div className="grid-item">
              <label htmlFor='familyName'>Family</label>
              <input type='text'
                name='familyName'
                onChange={this.handleFamilyChange}
                value={this.state.familyName} />
            </div>
            <div className="grid-item">
              <label htmlFor='genusName'>Genus</label>
              <input type='text'
                name='genusName'
                onChange={this.handleGenusChange}
                value={this.state.genusName} />
            </div>
            <div className="grid-item">
              <label htmlFor='speciesName'>Species</label>
              <input type='text'
                name='speciesName'
                onChange={this.handleSpeciesChange}
                value={this.state.speciesName} />
            </div>
            <StatelessButton handleClick={this.sendData} buttonLabel='Save' />
          </form>
        </div>);
  }
}

module.exports = Content