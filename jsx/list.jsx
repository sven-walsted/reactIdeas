const React = require('react')
const ReactDOM = require('react-dom')

const List = () =>
    <div className="well">
        <div className="grid-container">

            <div className="grid-item">Date</div>
            <div className="grid-item">Location</div>
            <div className="grid-item">Fish</div>
            <div className="grid-item">Quantity</div>
            <div className="grid-item">Notes</div>

            <div className="grid-item">8/6/2020</div>
            <div className="grid-item">Russian River</div>
            <div className="grid-item">Sockeye</div>
            <div className="grid-item">2</div>
            <div className="grid-item">Christain did all the catching.</div>

            <div className="grid-item">8/17/2020</div>
            <div className="grid-item">Anchor Point</div>
            <div className="grid-item">Halibut</div>
            <div className="grid-item">12</div>
            <div className="grid-item">Successful charter.</div>

        </div>

    </div>;

module.exports = List