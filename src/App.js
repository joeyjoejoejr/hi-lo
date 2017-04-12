import React, { Component } from 'react';
import CardPile, { arrangeDeck, arrangeDiscard, arrangePlayer } from './CardPile';
import Player from './Player';
import { gameState } from './GameState';
import Card, { CardData } from './Card';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const cards = Array.from({ length: 52 }, (_, i) => new CardData(i));
    this.state = {
      allCards: cards,
      deckCards: cards,
      discardCards: [],
      playerCards: [],
    }

    this.updateDeckCards = this.updateDeckCards.bind(this);
    this.updateDiscardCards = this.updateDiscardCards.bind(this);
    this.updatePlayerCards = this.updatePlayerCards.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  updatePlayerCards(cards) {
    this.updateCards(cards, 'playerCards');
  }

  updateDeckCards(cards) {
    this.updateCards(cards, 'deckCards');
  }

  updateDiscardCards(cards) {
    this.updateCards(cards, 'discardCards');
  }

  updateCards(cards, key) {
    let cardIndexes = []
    cards.forEach((card, i) => (cardIndexes[card.id] = i));

    this.setState((state) => {
      const newCards = state.allCards.map((card) => {
        const cardIndex = cardIndexes[card.id];

        return cardIndex ? cards[cardIndex] : card;
      });

      return {
        allCards: newCards,
        [key]: cards
      };
    });
  }

  startGame() {
    this.setState(state => {
      const card = state.deckCards.slice(-1)[0];
      const deckCards = state.deckCards.slice(0, -1);
      const playerCards = state.playerCards.concat(card);

      return { deckCards, playerCards };
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>HI-LO</h1>
        </div>

        <div className="App-dealer">
          <button
            className="App-start"
            onClick={this.startGame} >Start Game</button>
          <CardPile
            className="App-deck"
            cards={this.state.deckCards}
            updateCards={cards => this.updateCards(cards, 'deckCards') }
            arrangeCards={arrangeDeck} />
          <CardPile
            className="App-discard"
            cards={this.state.discardCards}
            updateCards={cards => this.updateCards(cards, 'discardCards') }
            arrangeCards={arrangeDiscard} />
        </div>

        <div className="App-player">
          <div className="App-playerbar">
            <h2 className='active'>Player 1 - 3pts</h2>
            <h2>Player 2 - 3pts</h2>
          </div>
          <div className="App-playercontrols">
            <Player active={true}>
              <CardPile
                className="App-playerpile"
                cards={this.state.playerCards}
                updateCards={cards => this.updateCards(cards, 'playerCards') }
                arrangeCards={arrangePlayer} />
            </Player>

            <Player active={false}>
              <CardPile
                className="App-playerpile"
                cards={this.state.playerCards}
                updateCards={cards => this.updateCards(cards, 'playerCards') }
                arrangeCards={arrangePlayer} />
            </Player>
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
