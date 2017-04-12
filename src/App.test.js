import React from 'react';
import ReactDOM from 'react-dom';
import {
  findRenderedDOMComponentWithClass as find,
  Simulate,
  renderIntoDocument,
} from 'react-dom/test-utils';
import App from './App';

describe("App", () => {
  let app;
  let rendered;
  beforeEach(() => {
    app = renderIntoDocument(<App />);
  });

  it('initializes with cards in the deck', () => {
    expect(app.state.allCards.length).toBe(52);
    expect(app.state.deckCards.length).toBe(52);
    expect(app.state.discardCards.length).toBe(0);
    expect(app.state.playerCards.length).toBe(0);
  });

  it('adds a card to the player pile when you start the game', () => {
    const startButton = find(app, 'App-start');
    Simulate.click(startButton);

    expect(app.state.deckCards.length).toBe(51);
    expect(app.state.playerCards.length).toBe(1);
  });
});
