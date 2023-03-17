import React, {Component} from 'react';
import {allCards, resultsPage, results} from "../utils/constants";

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: 'Next',
            score: {
                computer: 0,
                user: 0,
            },
            decks: {
                computer: [],
                user: [],
            },
            currentCard: {
                computer: null,
                user: null,
            }
        }
        this.deck = [...allCards];
    }

    shuffleDeck = () => {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    divideDeck = () => {
        const computerDeck = this.deck.splice(0, 26);
        const userDeck = this.deck;
        this.setState({
            ...this.state, decks: {
                computer: computerDeck,
                user: userDeck
            }
        });
    }

    nextStep = () => {
        if (this.state.button === results) {
            if (this.state.score.user > this.state.score.computer) {
                this.props.changeFullScore('user');
            } else if (this.state.score.user < this.state.score.computer) {
                this.props.changeFullScore('computer');
            }
            // this.props.changePage(resultsPage);
        } else {
            const currentComputerCard = Number(this.state.decks.computer.splice(0, 1));
            const currentUserCard = Number(this.state.decks.user.splice(0, 1));
            let currentScoreComputer = this.state.score.computer;
            let currentScoreUser = this.state.score.user;

            if (currentComputerCard > currentUserCard) {
                currentScoreComputer++;
            } else if (currentComputerCard < currentUserCard) {
                currentScoreUser++;
            }

            let result = {
                ...this.state,
                currentCard: {
                    computer: currentComputerCard,
                    user: currentUserCard,
                },
                score: {
                    computer: currentScoreComputer,
                    user: currentScoreUser,
                },
            }

            if (this.state.decks.computer.length === 0 || this.state.decks.user.length === 0) {
                result.button = results;
            }

            this.setState(result);
        }
    }

    componentDidMount() {
        this.shuffleDeck();
        this.divideDeck();
    }

    render() {
        return (
            <div className="game">
                <h1 className="playerName">Computer: {this.state.score.computer}</h1>
                <div className="card">{this.state.currentCard.computer}</div>
                <div className="card">{this.state.currentCard.user}</div>
                <h1 className="playerName">{this.props.userName}: {this.state.score.user}</h1>
                <button className="next-btn"
                        onClick={this.nextStep}
                >{this.state.button}
                </button>
            </div>
        );
    }
}

export default GamePage;