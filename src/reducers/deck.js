import deck from '../data/deck'
import { ASKED_CARD } from '../actions/askedCard';
import { CHANGE_TURN } from '../actions/changeTurn'

// necessary information from store state:
// * playerturnID (in askedCard!)
// * > otherplayerID

export default (state = deck, {type, payload} = {}) => {

  switch(type) {
    case CHANGE_TURN: 
      // card that CHANGE_TURN action draws randomly from deck (deckNo = 0)
      // will be assigned to playerTurnId. 
      // console.log('random assigned card from action', payload)
      return state 
      // break

    case ASKED_CARD:
      // change deck. conditionally:
      // if 1) card is valid (done in app.js) &
      // 2) card-letter in hand playerturn & 
      // 3) card in hand otherplayer (should be handled here)
      // > 'move' card from otherplayerhand to playerturn hand. 
      const selectHand = (deck, letter) => deck.filter(card => card.deckNo === letter)

      const updatedItems = state.map(item => {
        if(item.letter === payload.letter && item.number === payload.number){
          // Check whether player is allowed to ask for this card 
          if (selectHand(state, payload.letter).length > 0){
            if (item.deckNo === 0) {
              // if card in otherplayerhand > use payload card in deck 
              // (already has deckNo of current player)
              return item
            }
            else return payload
          }
        }
        return item
      })
      return updatedItems

      // return state 
      // break

    default: 
      return state  
  }
}