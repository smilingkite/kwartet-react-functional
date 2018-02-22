import Card from '../helpers/cardConstructor';

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

const dealCard = (playerNo, deck) => {
  // deal a random card: assign one card to the player
  const deckNo = playerNo
  const random = Math.floor(Math.random() * deck.length)
  if (deck[random].deckNo === 0) {
    return deck.map(card => {
      if (card.deckNo === 0 && deck[random] === card) {
        return {
          ...card,
          deckNo
        }
      } else {
        return { ...card }
      }
    })
  } else if (selectHand(deck,0).length === 0) { 
    console.log('!!!!!de kaarten zijn op!');
    return deck;
  } else return dealCard(playerNo, deck)
}

const dealCards = (player, deck, no) => {
  no--
  var newDeck
  // const from = 0
  if (no >= 0) {
    newDeck = dealCard(player, deck)
    return dealCards(player, newDeck, no)
  } else {
    return deck
  }
}

const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
deck = dealCards(2, dealCards(1, deck, 6), 6);
console.log(deck)

export default deck
