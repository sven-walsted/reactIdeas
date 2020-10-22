const React = require('react')
const ReactDOM = require('react-dom')

const Button = require('./stateless-button.jsx')
const SelectableText = require('./selectable-text.jsx')

const List = (props) =>
    <table id="t01">
        <tbody>
            <tr>
                <th>Common Name</th>
                <th>Family</th>
                <th>Genus</th>
                <th>Species</th>
                <th><Button handleClick={props.handleAddClick} buttonLabel='Add' /></th>
            </tr>
        </tbody>
        <tbody>
            {props.fishes.map((fish) => {
                return (props.activeRecordId == fish.id)
                    ?
                    <tr key={fish.id}>
                        <td>
                            <input type='text'
                                name='commonName'
                                onChange={props.handleCommonChange}
                                value={props.commonName} />
                        </td>
                        <td>
                            <input type='text'
                                name='familyName'
                                onChange={props.handleFamilyChange}
                                value={props.familyName} />
                        </td>
                        <td>
                            <input type='text'
                                name='genusName'
                                onChange={props.handleGenusChange}
                                value={props.genusName} />
                        </td>
                        <td>
                            <input type='text'
                                name='speciesName'
                                onChange={props.handleSpeciesChange}
                                value={props.speciesName} />
                        </td>
                        <td>
                            <Button handleClick={props.handleCancelClick} buttonLabel='Cancel' />
                            <Button handleClick={props.handleSaveClick} buttonLabel='Save' />
                        </td>
                    </tr>
                    :
                    <tr key={fish.id}>
                        <td><span className='pointer' ><SelectableText {...props} recordId={fish} text={fish.commonName} /></span></td>
                        <td><span className='pointer' ><SelectableText {...props} recordId={fish} text={fish.familyName} /></span></td>
                        <td><span className='pointer' ><SelectableText {...props} recordId={fish} text={fish.genusName} /></span></td>
                        <td><span className='pointer' ><SelectableText {...props} recordId={fish} text={fish.speciesName} /></span></td>
                        <td>
                            <Button buttonLabel='Update' handleClick={props.handleUpdateClick} recordId={fish.id} />
                            <Button buttonLabel='Delete' handleClick={props.handleDeleteClick} recordId={fish.id} />
                        </td>
                    </tr>
            }
            )}
        </tbody>
    </table>;

module.exports = List