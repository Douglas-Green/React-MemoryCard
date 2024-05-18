/** @format */

import shuffle from "shuffle-array";

class MemoryCards {
  constructor() {
    this.cards = [];
    this.NUM_IMAGES = 10;
  }

  generateCardSet() {
    //
    // Generate a set of cards with image pairs
    //
    this.cards = [];
    let id = 1;
    for (let i = 1; i <= this.NUM_IMAGES; i++) {
      const card1 = {
        id: id,
        image: i,
        imageUp: false,
        matched: false,
      };
      id++;
      const card2 = {
        id: id,
        image: i,
        imageUp: false,
        matched: false,
      };
      this.cards.push(card1);
      this.cards.push(card2);
      id++;
    }

    // Randomize the card set
    shuffle(this.cards);
  }

  getCard(id) {
    return this.cards.find(card => card.id === id);
  }

  flipCard(id, imageUp) {
    const card = this.getCard(id);
    if (card) {
      card.imageUp = imageUp;
    }
  }

  setCardAsMatched(id, matched) {
    const card = this.getCard(id);
    if (card) {
      card.matched = matched;
    }
  }

  cardsHaveIdenticalImages(id1, id2) {
    const card1 = this.getCard(id1);
    const card2 = this.getCard(id2);
    return card1 && card2 ? card1.image === card2.image : false;
  }
}

export default MemoryCards;
