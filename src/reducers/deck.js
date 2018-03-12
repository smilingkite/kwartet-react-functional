import deck from '../data/deck'
import { MOVE_CARD } from '../actions/moveCard';

export default (state = deck, {type, payload} = {}) => {

  switch(type) {

    case MOVE_CARD:
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