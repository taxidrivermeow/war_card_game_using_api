import React, {useEffect, useState} from 'react';
import {results} from "../utils/constants";
import Api from "../utils/Api";
import Card from "../utils/Card";

const GamePage = (props) => {
    const [deck, setDeck] = useState('');
    const [button, setButton] = useState('Next');
    const [loadingCards, setLoadingCards] = useState(false);
    const [score, setScore] = useState({
        computer: 0,
        user: 0,
    });
    const [currentCard, setCurrentCard] = useState({
        computer: 'back',
        user: 'back',
    });

    useEffect(() => {
        (async () => {
            setDeck(await Api.getNewDeck());
        })()
    }, []);

    const nextStep = async () => {
        if (button === results) {
            let winner;
            const currentScoreComputer = score.computer;
            const currentScoreUser = score.user;
            const lastScore = `${currentScoreComputer} - ${currentScoreUser}`;

            if (currentScoreUser > currentScoreComputer) {
                winner = 'user';
            } else if (currentScoreUser < currentScoreComputer) {
                winner = 'computer';
            } else {
                winner = 'draw'
            }

            props.gameOver(winner, lastScore);
        } else {
            setLoadingCards(true);
            const currentDeckState = await Api.getNewCardPair(deck);
            const [currentComputerCardCode, currentUserCardCode, remaining] = currentDeckState;
            const currentComputerCard = Card.checkValue(currentComputerCardCode);
            const currentUserCard = Card.checkValue(currentUserCardCode);

            let currentScoreComputer = score.computer;
            let currentScoreUser = score.user;

            if (currentComputerCard > currentUserCard) {
                currentScoreComputer++;
            } else if (currentComputerCard < currentUserCard) {
                currentScoreUser++;
            }

            setLoadingCards(false);
            setCurrentCard({
                computer: currentComputerCardCode,
                user: currentUserCardCode,
            });
            setScore({
                computer: currentScoreComputer,
                user: currentScoreUser,
            });

            if (remaining === 0) {
                setButton(results);
            }
        }
    }

    return (
        <div className="game">
            <h1 className="playerName">Computer: {score.computer}</h1>
            <img className="card" src={`https://deckofcardsapi.com/static/img/${currentCard.computer}.png`} alt={'card'}/>
            <img className="card" src={`https://deckofcardsapi.com/static/img/${currentCard.user}.png`} alt={'card'}/>
            <h1 className="playerName">{props.userName}: {score.user}</h1>
            <div className={'div-btn'}>
                {loadingCards?'':
                    <button className="next-btn"
                            onClick={nextStep}
                    >{button}
                    </button>
                }
            </div>
        </div>
    );
};

export default GamePage;