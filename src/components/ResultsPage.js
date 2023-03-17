import React, {Component} from 'react';
import {gamePage} from "../utils/constants";

class ResultsPage extends Component {
    render() {
        return (
            <div className="results">
                <h1 className="score">Computer - {this.props.userName}</h1>
                <h1 className="score">{this.props.fullScore.computer} : {this.props.fullScore.user}</h1>
                <button onClick={() => {this.props.changePage(gamePage)}} className="again-btn">Again?</button>
            </div>
        );
    }
}

export default ResultsPage;