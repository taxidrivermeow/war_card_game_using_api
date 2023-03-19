import React, {Component} from 'react';
import {results} from "../utils/constants";
import Api from "../utils/Api";
import Card from "../utils/Card";

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.deck = ''
        this.state = {
            button: 'Next',
            loadingCards: false,
            score: {
                computer: 0,
                user: 0,
            },
            currentCard: {
                computer: 'back',
                user: 'back',
            }
        }
    }

    nextStep = async () => {
        if (this.state.button === results) {
            let winner;
            const currentScoreComputer = this.state.score.computer;
            const currentScoreUser = this.state.score.user;
            const score = `${currentScoreComputer} - ${currentScoreUser}`;

            if (currentScoreUser > currentScoreComputer) {
                winner = 'user';
            } else if (currentScoreUser < currentScoreComputer) {
                winner = 'computer';
            } else {
                winner = 'draw'
            }

            this.props.gameOver(winner, score);
        } else {
            this.setState({
                ...this.state,
                loadingCards: true,
            });
            const currentDeckState = await Api.getNewCardPair(this.deck);
            const [currentComputerCardCode, currentUserCardCode, remaining] = currentDeckState;
            const currentComputerCard = Card.checkValue(currentComputerCardCode);
            const currentUserCard = Card.checkValue(currentUserCardCode);

            let currentScoreComputer = this.state.score.computer;
            let currentScoreUser = this.state.score.user;

            if (currentComputerCard > currentUserCard) {
                currentScoreComputer++;
            } else if (currentComputerCard < currentUserCard) {
                currentScoreUser++;
            }

            let result = {
                ...this.state,
                loadingCards: false,
                currentCard: {
                    computer: currentComputerCardCode,
                    user: currentUserCardCode,
                },
                score: {
                    computer: currentScoreComputer,
                    user: currentScoreUser,
                },
            }

            if (remaining === 0) {
                result.button = results;
            }

            this.setState(result);
        }
    }

    render() {
        return (
            <div className="game">
                <h1 className="playerName">Computer: {this.state.score.computer}</h1>
                <img className="card" src={`https://deckofcardsapi.com/static/img/${this.state.currentCard.computer}.png`} alt={'card'}/>
                <img className="card" src={`https://deckofcardsapi.com/static/img/${this.state.currentCard.user}.png`} alt={'card'}/>
                <h1 className="playerName">{this.props.userName}: {this.state.score.user}</h1>
                <div className={'div-btn'}>
                    {this.state.loadingCards?'':
                        <button className="next-btn"
                                onClick={this.nextStep}
                        >{this.state.button}
                        </button>
                    }
                </div>
            </div>
        );
    }

    componentDidMount = async () => {
        this.deck = await Api.getNewDeck();
    }
}

export default GamePage;