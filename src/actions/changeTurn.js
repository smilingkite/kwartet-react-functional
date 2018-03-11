// import store from '../store';

// const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
// let stored = getState
// console.log('STORE', store) // WHY undefined???

// const findRandomUnassignedCard = (deck) => {
//   if (selectHand(deck,0).length === 0) return {}
//   const random = Math.floor(Math.random() * deck.length)

//   if (deck[random].deckNo === 0) {
//     return deck[random]
//   } else return findRandomUnassignedCard(deck)
// }

// const card = findRandomUnassignedCard(deck)

// NB: asign to hand playerTurn???? (would help keep reducer logic simple)

export const CHANGE_TURN = 'CHANGE_TURN'
export default (card) => {
  return {
    type: CHANGE_TURN,
    payload: card
  }
}