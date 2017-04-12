import React from 'react';
import gameState from '../GameState';

import './Player.css';

export default ({ active, children }) => (
  <div className="Player">
    <div>
      <div className="Player-cards">
        {active && children}
      </div>
    </div>

    <div className={"Player-controls " + (!active && "disabled")}>
      <p>Guess the next card!</p>
      <button disabled={!gameState.canGuess}>High</button>
      <button disabled={!gameState.canGuess}>Low</button>
      <button disabled={!gameState.canPass}>Pass</button>
    </div>
  </div>
)
