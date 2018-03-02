import store from '../store';

// const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
let deck = store
console.log('STORE', store)

// const findRandomUnassignedCard = (deck) => {
//   if (selectHand(deck,0).length === 0) return {}
//   const random = Math.floor(Math.random() * deck.length)

//   if (deck[random].deckNo === 0) {
//     return deck[random]
//   } else return findRandomUnassignedCard(deck)
// }

// const card = findRandomUnassignedCard(deck)

export const CHANGE_TURN = 'CHANGE_TURN'
export default (card) => {
  return {
    type: CHANGE_TURN,
    payload: card
  }
}