const React = require('react')
const ReactDOM = require('react-dom')

const StatelessButton = require('./stateless-button.jsx')
const FishRow = require('./stateless-fish-row.jsx')

const List = (props) =>
    <table id="t01">
        <tbody>
            <tr>
                <th></th>
                <th>Common Name</th>
                <th>Family</th>
                <th>Genus</th>
                <th>Species</th>
            </tr>
        </tbody>
        <tbody>
            {props.fishes.map((fish) =>
                <tr key={fish.id}>
                    <td>
                        <button type='button' onClick={props.handleUpdateClick} value={fish.id} >
                            Update
                        </button>
                        <button type='button' onClick={props.handleDeleteClick} value={fish.id} >
                            Delete
                        </button>
                    </td>
                    <td>{fish.commonName}</td>
                    <td>{fish.familyName}</td>
                    <td>{fish.genusName}</td>
                    <td>{fish.speciesName}</td>
                </tr>
            )}
        </tbody>
    </table>;

module.exports = List