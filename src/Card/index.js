import React from 'react';
import './Card.css';

export class CardData {
  constructor(id) {
    this.id = id;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotateZ = 0;
    this.rotateX = 0;
    this.zIndex = 0;
    this._cardData = {};
  }

  set cardData(data) {
    const numberValue = parseInt(data.value, 10);
    this.cardValue = isNaN(numberValue) ? this._convertValue(data.value) : numberValue;
    this._cardData = data
  }
  get cardData() {
    return this._cardData;
  }

  _convertValue(val) {
    return {
      "ACE": 1,
      "JACK": 11,
      "QUEEN": 12,
      "KING": 13
    }[val.toUpperCase()];
  }
}


export default ({ card }) => {
  const styles = {
    transform: `translate(${card.offsetX}px, ${card.offsetY}px) rotateZ(${card.rotateZ}deg) rotateX(${card.rotateX}deg)`,
    zIndex: card.zIndex,
  };

  return (
    <div className="Card" style={styles}>
      <div className="Card-back" />
      <div className="Card-front">
        <img src={card.cardData.image} alt={card.cardData.code} />
      </div>
    </div>
  );
};

