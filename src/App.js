import React, {Component} from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import GamePage from "./components/GamePage";
import {gamePage, loginPage, resultsPage} from "./utils/constants";
import ResultsPage from "./components/ResultsPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            currentWinner: 'Draw',
            currentPage: loginPage,
            lastScore: null,
            fullScore: {
                computer: 0,
                user: 0,
            },
        }
    }

    gameOver = (winner, lastScore) => {
        let winnerName;
        let computerScore = this.state.fullScore.computer;
        let userScore = this.state.fullScore.user;
        if (winner === 'user') {
            winnerName = this.state.userName;
            userScore++;
        } else if (winner === 'computer') {
            winnerName = 'Computer';
            computerScore++;
        } else {
            winnerName = 'Draw';
        }

        this.setState({
            ...this.state,
            currentWinner: winnerName,
            currentPage: resultsPage,
            lastScore: lastScore,
            fullScore: {
                computer: computerScore,
                user: userScore,
            },
        });
    }

    changePage = page => {
        this.setState({...this.state, currentPage: page});
    }

    setName = e => {
        this.setState({...this.state, userName: e.currentTarget.value.trim()});
    }

    checkName = () => {
        if (this.state.userName) {
            this.changePage(gamePage);
        }
    }

    render() {
        return (
            <div className={'wrapper'}>
                {(this.state.currentPage === gamePage) ? <GamePage userName={this.state.userName}
                                                                   changePage={this.changePage}
                                                                   gameOver={this.gameOver}
                    /> :
                    (this.state.currentPage === resultsPage) ? <ResultsPage userName={this.state.userName}
                                                                            changePage={this.changePage}
                                                                            fullScore={this.state.fullScore}
                                                                            currentWinner={this.state.currentWinner}
                                                                            lastScore={this.state.lastScore}
                        /> : <LoginPage setName={this.setName}
                                        checkName={this.checkName}
                    />}
            </div>
        );
    }
}

export default App;