const React = require('react')
const ReactDOM = require('react-dom')

const StatelessButton = require('./stateless-button.jsx')

// This form doesn't allow {this.props.myProp}
const StatelessFishRow = (props) =>
    <tr>
        <td><StatelessButton {...props} /></td>
        <td>{props.commonName}</td>
        <td>{props.familyName}</td>
        <td>{props.genusName}</td>
        <td>{props.speciesName}</td>
    </tr>;

module.exports = StatelessFishRow