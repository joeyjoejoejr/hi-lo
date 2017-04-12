import React from 'react';
import gameState from '../GameState';

import './Player.css';

export default ({ active, guessHigh, guessLow, pass, children }) => (
  <div className="Player">
    <div>
      <div className="Player-cards">
        {active && children}
      </div>
    </div>

    <div className={"Player-controls " + (!active && "disabled")}>
      <p>Guess the next card!</p>
      <button
        onClick={guessHigh}
        disabled={!gameState.canGuess}>High</button>
      <button
        onClick={guessLow}
        disabled={!gameState.canGuess}>Low</button>
      <button
        onClick={pass}
        disabled={!gameState.canPass}>Pass</button>
    </div>
  </div>
)
