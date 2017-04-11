import React from 'react';
import './Card.css';

export class CardData {
  constructor(id) {
    this.id = id;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotateZ = 0;
    this.zIndex = 0;
  }
}


export default ({ card }) => {
  const styles = {
    transform: `translate(${card.offsetX}px, ${card.offsetY}px) rotateZ(${card.rotateZ}deg)`,
    zIndex: card.id,
  };

  return <div className="Card" style={styles} />;
};

