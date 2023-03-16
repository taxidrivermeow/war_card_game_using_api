import React, {Component} from 'react';
import './App.css';
import LoginPage from "./components/LoginPage";
import GamePage from "./components/GamePage";
import {gamePage, loginPage, resultPage} from "./utils/constants";
import ResultsPage from "./components/ResultsPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            currentPage: loginPage,
        }
    }

    setName = e => {
        this.setState({...this.state, userName: e.currentTarget.value.trim()});
    }

    checkName = () => {
        if (this.state.userName) {
            this.setState({...this.state, currentPage: gamePage})
        }
    }

    render() {
        return (
            <div className={'wrapper'}>
                {(this.state.currentPage === gamePage) ? <GamePage userName={this.state.userName}/> :
                    (this.state.currentPage === resultPage) ? <ResultsPage/> :
                        <LoginPage setName={this.setName} checkName={this.checkName}/>}
            </div>
        );
    }
}

export default App;