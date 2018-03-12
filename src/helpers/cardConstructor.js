function Card(letter, number, deckNo) {
  this.letter = letter
  this.number = number
  // deckNo = 0 : card is in the deck, can be dealt
  // deckNo = 1 : card is in the hand of player 1
  // deckNo = 2 : card is in the hand of player 2
  // deckNo = 9 : card is in a kwartet (see kwartetList)
  this.deckNo = deckNo
}

export default Card;