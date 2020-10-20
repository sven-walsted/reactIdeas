const React = require('react')
const ReactDOM = require('react-dom')

const Button = require('./stateless-button.jsx')

const List = (props) =>
    <table id="t01">
        <tbody>
            <tr>
                <th><Button handleClick={props.handleAddClick} buttonLabel='Add' /></th>
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
                        <Button buttonLabel='Update' handleClick={props.handleUpdateClick} recordId={fish.id} />
                        <Button buttonLabel='Delete' handleClick={props.handleDeleteClick} recordId={fish.id} />
                    </td>
                    <td><span className='pointer' >{fish.commonName}</span></td>
                    <td><span className='pointer' >{fish.familyName}</span></td>
                    <td><span className='pointer'>{fish.genusName}</span></td>
                    <td><span className='pointer'>{fish.speciesName}</span></td>
                </tr>
            )}
        </tbody>
    </table>;

module.exports = List