import Card from '../helpers/cardConstructor';
import dealCard from '../helpers/dealCard';

function deckCards(deck) {
  for (let i = 0; i < 7; i++) {
    for (let j = 1; j < 5; j++) {
      const card = new Card(letters[i], j, 0)
      deck.push(card)
    }
  }
  return deck
}

const letters = ["A", "B", "C", "D", "E", "F", "G"]
var deck = deckCards([])

const dealCards = (player, deck, no) => {
  no--
  var newDeck
  if (no >= 0) {
    newDeck = dealCard(player, deck)
    return dealCards(player, newDeck, no)
  } else {
    return deck
  }
}

deck = dealCards(2, dealCards(1, deck, 6), 6);

export default deck
