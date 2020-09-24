const React = require('react')
const ReactDOM = require('react-dom')

class Form extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="well">
                <div className="grid-item">8/17/2020</div>
                <div className="grid-item">Anchor Point</div>
                <div className="grid-item">Halibut</div>
                <div className="grid-item">12</div>
                <div className="grid-item">Successful charter.</div>
            </div>
        );
    }

}

module.exports = Form