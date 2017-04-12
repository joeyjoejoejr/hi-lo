import React, { Component } from 'react';
import CardPile, { arrangeDeck, arrangeDiscard, arrangePlayer } from './CardPile';
import Player from './Player';
import gameState from './GameState';
import Card, { CardData } from './Card';
import { createDeck, getCard } from './utils/api'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    createDeck();

    const cards = Array.from({ length: 52 }, (_, i) => new CardData(i));
    this.state = {
      allCards: cards,
      deckCards: cards,
      discardCards: [],
      playerCards: [],
      gameState: gameState,
    }
    this._clearState = this.state;

    this.startGame = this.startGame.bind(this);
    this.guessLow = this.guessLow.bind(this);
    this.guessHigh = this.guessHigh.bind(this);
    this.pass = this.pass.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  startGame() {
    this._drawCard().then(_card => {
      gameState.start();
      this.setState({ gameState });
    });
  }

  _drawCard() {
    return getCard().then(deckData => {
      if(!deckData.remaining) { gameState.complete(); }
      const cardData = deckData["cards"][0];

      const card = this.state.deckCards.slice(-1)[0];
      this._prevCard = this.state.playerCards.slice(-1)[0];
      card.cardData = cardData;

      this.setState(state => {
        const deckCards = state.deckCards.slice(0, -1);
        const playerCards = state.playerCards.concat(card);

        return { deckCards, playerCards, gameState };
      });

      return card;
    });
  }

  guessLow() {
    this._guessCard((card, prevCard) => card.cardValue < prevCard.cardValue);
  }

  guessHigh() {
    this._guessCard((card, prevCard) => card.cardValue > prevCard.cardValue);
  }

  _guessCard(test) {
    this._drawCard().then(card => {
      if(test(card, this._prevCard)) {
        gameState.guessRight();
        this.setState({ gameState });
      } else {
        gameState.guessWrong();
        this._addPoints(this.state.playerCards.length);

        this.setState(state => {
          return {
            playerCards: [],
            discardCards: state.discardCards.concat(state.playerCards),
            gameState: gameState,
          };
        }, this._drawCard);
      }
    });
  }

  _addPoints(points) {
    gameState.players.forEach(player => {
      if(player.active) {
        player.points += points;
      }
    });
    this.setState({ gameState });
  }

  pass() {
    gameState.pass();
    this.setState({ gameState });
  }

  resetGame() {
    gameState.reset();
    createDeck();
    this.setState(this._clearState);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>HI-LO</h1>
        </div>

        <div className="App-dealer">
          {
            gameState.started ?
              <button
                className="App-start"
                onClick={this.resetGame} >Reset Game</button> :
              <button
                className="App-start"
                disabled={gameState.started}
                onClick={this.startGame} >Start Game</button>
          }
          <CardPile
            className="App-deck"
            cards={this.state.deckCards}
            updateCards={cards => this.setState({ deckCards: cards }) }
            arrangeCards={arrangeDeck} />
          <CardPile
            className="App-discard"
            cards={this.state.discardCards}
            updateCards={cards => this.setState({ discardCards: cards }) }
            arrangeCards={arrangeDiscard} />
        </div>

        <div className="App-player">
          <div className="App-playerbar">
            {
              gameState.players.map((player, i) => (
                <h2
                  key={i}
                  className={player.active ? 'active' : ''}>
                  Player {i + 1} - { player.winner ? "winner!" : player.points + "pts" }
                </h2>
              ))
            }
          </div>

          <div className="App-playercontrols">
            {
              gameState.players.map((player, i) => (
                <Player
                  key={i}
                  active={player.active}
                  guessHigh={this.guessHigh}
                  guessLow={this.guessLow}
                  pass={this.pass}>
                  <CardPile
                    className="App-playerpile"
                    cards={this.state.playerCards}
                    updateCards={cards => this.setState({ playerCards: cards }) }
                    arrangeCards={arrangePlayer} />
                </Player>
              ))
            }
          </div>
        </div>

        <div className="App-cards">
          {
            this.state.allCards.map(card => <Card key={card.id} card={card} />)
          }
        </div>
      </div>
    );
  }
}

export default App;
