import deck from '../data/deck'
import { ASKED_CARD } from '../actions/askedCard';

export default (state = deck, {type, payload} = {}) => {

  switch(type) {

    case ASKED_CARD:
      // change deck. conditionally:
      // if 1) card is valid (done in app.js) &
      // 2) card-letter in hand playerturn & 
      // 3) card in hand otherplayer (should be handled here)
      // > 'move' card from otherplayerhand to playerturn hand. 
 
      const updatedItems = state.map(item => {
        if(item.letter === payload.letter && item.number === payload.number){

          if (item.deckNo === 0) {
             // if card in otherplayerhand > use payload card in deck 
             // (already has deckNo of current player)
             return item
          }
          else return payload
        }
        return item
      })
      return updatedItems

    default: 
      return state  
  }
}