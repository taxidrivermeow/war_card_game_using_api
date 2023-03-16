import React, {Component} from 'react';

class ResultsPage extends Component {
    render() {
        return (
            <div className="results">
                <h1 className="score">Computer - 2 : 3 - UserName</h1>
                <button className="again-btn">Again?</button>
            </div>
        );
    }
}

export default ResultsPage;