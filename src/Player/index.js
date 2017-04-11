import React from 'react';
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
      <button>High</button>
      <button>Low</button>
      <button disabled>Pass</button>
    </div>
  </div>
)
