const React = require('react')
const ReactDOM = require('react-dom')

const Button = require('./stateless-button.jsx')
const Form = require('./form.jsx')
const List = require('./list.jsx')

const moneyValidation = money => {
  console.log('moneyValidation: ' + money)
  if (!money) {
    return "Money is required";
  }
  if (money < 0) {
    return "Money must be positive";
  }
  if (money > 10000) {
    return "You're spending too much money!";
  }
  const r = /^\$?[0-9]+(\.[0-9][0-9])?$/
  console.log('test:' + r.test(money))
  if (!r.test(money)) {
    return "That ain't money, fool"
  }
  return null;
}

const validate = {
  guideCost: moneyValidation
};

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: '',
      activeRecordId: '',
      displayList: true,
      // button cmds
      handleCancelClick: this.handleCancelClick.bind(this),
      handleSaveClick: this.handleSaveClick.bind(this),
      // input fields
      handleCommonChange: this.handleCommonChange.bind(this),
      handleFamilyChange: this.handleFamilyChange.bind(this),
      handleGenusChange: this.handleGenusChange.bind(this),
      handleSpeciesChange: this.handleSpeciesChange.bind(this),
      handleGuideCostChange: this.handleGuideCostChange.bind(this),
      // handlers
      handleSelectRecord: this.handleSelectRecord.bind(this),
      handleAddClick: this.handleAddClick.bind(this),
      handleDeleteClick: this.handleDeleteClick.bind(this),
      handleUpdateClick: this.handleUpdateClick.bind(this),
      handleBlur: this.handleBlur.bind(this),
      fishes: [],
      saveMethod: '',
      id: '',
      commonName: '',
      className: '',
      orderName: '',
      familyName: '',
      genusName: '',
      speciesName: '',
      guideCost: ''
    }
  }
  handleSelectRecord(record) {
    console.log('recordId: ' + record.id)
    this.setState({
      saveMethod: 'PUT',
      activeRecordId: record.id,
      // duplicate: refactor
      id: record.id,
      commonName: record.commonName,
      className: record.className,
      orderName: record.orderName,
      familyName: record.familyName,
      genusName: record.genusName,
      speciesName: record.speciesName,
      guideCost: ''
    })
  }
  handleCommonChange(event) {
    console.log('Change commonName: ' + event.target.value)
    this.setState({ commonName: event.target.value })
  }
  handleFamilyChange(event) {
    console.log('Change familyName: ' + event.target.value)
    this.setState({ familyName: event.target.value })
  }
  handleGenusChange(event) {
    this.setState({ genusName: event.target.value })
  }
  handleSpeciesChange(event) {
    this.setState({ speciesName: event.target.value })
  }
  handleGuideCostChange(event) {
    console.log('handleGuideCostChange')
    this.setState({ guideCost: event.target.value })
  }
  handleAddClick(event) {
    this.clearField()
    this.setState({
      saveMethod: 'POST',
      displayList: false
    })
  }
  handleCancelClick(event) {
    this.clearField()
    this.setState({
      displayList: true,
    })
  }
  handleSaveClick(event) {
    console.log('handleSaveClick')
    this.setState({
      displayList: true
    })
    this.sendData()
    this.clearField()
  }
  handleUpdateClick(event) {
    console.log("Update ID: " + event.target.value)
    this.clearField()
    this.setState({
      displayList: false,
    })
    this.loadDatum(event.target.value)
  }
  handleDeleteClick(event) {
    console.log("Delete ID: " + event.target.value)
    this.deleteData(event.target.value)
  }
  handleBlur(event) {
    const { name, value } = event.target;
    console.log('handleBlur: ' + name + "|" + value)
    const error = validate[name](value);
    console.dir(error)
    this.setState({
      errors: error
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
  loadDatum(id) {
    fetch('resources/fish/' + id)
      .then((response) => response.json())
      .then((fish) => {
        console.dir(fish)
        this.setState({
          saveMethod: 'PUT',
          id: fish.id,
          commonName: fish.commonName,
          className: fish.className,
          orderName: fish.orderName,
          familyName: fish.familyName,
          genusName: fish.genusName,
          speciesName: fish.speciesName
          // guideCost: ''
        })
      })
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
      // guideCost: ''
    }
    fetch('resources/fish/' + this.state.id, {
      method: this.state.saveMethod,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response.status)
        // if (201 == response.status) {
        //// then created and we can get id, 
        //// or refresh object,
        //// or set this fetch method to PUT.
        //// for update.
        // }
        // Conceptually doesn't belong here.
        if (this.state.displayList)
          this.loadData()
        else
          this.loadDatum(this.state.id)
      })
      .catch((error) => {
        console.error(('Error', error));
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
      saveMethod: '',
      activeRecordId: '',
      id: '',
      commonName: '',
      className: '',
      orderName: '',
      familyName: '',
      genusName: '',
      speciesName: '',
      guideCost: ''
    })
  }
  componentDidMount() {
    console.log("componentDidMount...")
    this.loadData()
  }
  render() {
    if (this.state.displayList)
      return <div className="well"><List {...this.state} /></div>
    else
      return (
        <div className="well">
          <form>
            <div className="grid-item">
              <label htmlFor='commonName'>Common Name</label>
              <input type='text'
                name='commonName'
                onChange={this.state.handleCommonChange}
                value={this.state.commonName}
                required />
            </div>
            <div className="grid-item">
              <label htmlFor='familyName'>Family</label>
              <input type='text'
                name='familyName'
                onChange={this.state.handleFamilyChange}
                value={this.state.familyName} />
            </div>
            <div className="grid-item">
              <label htmlFor='genusName'>Genus</label>
              <input type='text'
                name='genusName'
                onChange={this.state.handleGenusChange}
                value={this.state.genusName} />
            </div>
            <div className="grid-item">
              <label htmlFor='speciesName'>Species</label>
              <input type='text'
                name='speciesName'
                onChange={this.state.handleSpeciesChange}
                value={this.state.speciesName} />
            </div>
            <div className="grid-item">
              <label htmlFor='guideCost'>Guide Cost ($)</label>
              <input type='text'
                id="guideCost"
                name='guideCost'
                onChange={this.state.handleGuideCostChange}
                onBlur={this.state.handleBlur}
                value={this.state.guideCost} />
                {this.state.errors}
            </div>
            <Button handleClick={this.state.handleCancelClick} buttonLabel='Cancel' />
            <Button handleClick={this.state.handleSaveClick} buttonLabel='Save' />
          </form>
        </div>);
  }
}

module.exports = Content