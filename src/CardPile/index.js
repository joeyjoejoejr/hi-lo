import React from 'react';

export const arrangeDeck = (cards, clientRect) => cards.map((card, i) => {
  card.offsetX = clientRect.left - (i * 0.35);
  card.offsetY = clientRect.top - (i * 0.35);
  card.rotateZ = 0;
  card.rotateX = 0;
  card.zIndex = i;
  return card;
});

export const arrangeDiscard = (cards, clientRect) => cards.map((card, i) => {
  card.offsetX = clientRect.left + (Math.random() * 20) - 10;
  card.offsetY = clientRect.top + (Math.random() * 20) - 10;
  card.rotateZ = (Math.random() * 90) - 45;
  card.zIndex = i
  return card;
});

export const arrangePlayer = (cards, clientRect) => {
  const stackedCards = cards.map((card, i) => {
    card.offsetX = clientRect.left;
    card.offsetY = clientRect.top;
    card.rotateZ = 0;
    card.rotateX = 180;
    card.zIndex = i
    return card;
  });

  // Fan the last 4 cards
  stackedCards.slice(-4).forEach((card, i) => {
    card.offsetX = clientRect.left + (i * 15);
    card.offsetY = clientRect.top;
    return card;
  });

  return stackedCards;
};


export default class CardPile extends React.Component {
  componentDidMount() {
    const clientRect = this.pileElement.getBoundingClientRect();
    const newCards = this.props.arrangeCards(this.props.cards, clientRect);
    this.props.updateCards(newCards);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.cards.length !== this.props.cards.length) {
      const clientRect = this.pileElement.getBoundingClientRect();
      const newCards = this.props.arrangeCards(newProps.cards, clientRect);
      this.props.updateCards(newCards);
    }
  }

  render() {
    return(
      <div className={this.props.className}
        ref={pileElement => { this.pileElement = pileElement }}>
        <p>{this.props.cards.length}</p>
      </div>
    );
  }
};
