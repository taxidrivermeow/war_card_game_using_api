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
            fullScore: {
                computer: 0,
                user: 0,
            },
            currentPage: loginPage,
        }
    }

    changeFullScore = winner => {
        this.setState({...this.state, currentWinner: winner});
        // this.changePage(resultsPage);
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
        console.log(this.state);
        return (
            <div className={'wrapper'}>
                {(this.state.currentPage === gamePage) ? <GamePage userName={this.state.userName}
                                                                   changePage={this.changePage}
                                                                   changeFullScore={this.changeFullScore}
                    /> :
                    (this.state.currentPage === resultsPage) ? <ResultsPage userName={this.state.userName}
                                                                            changePage={this.changePage}
                                                                            fullScore={this.state.fullScore}
                        /> : <LoginPage setName={this.setName}
                                        checkName={this.checkName}
                    />}
            </div>
        );
    }
}

export default App;