import deck from '../data/deck'
import { ASKED_CARD } from '../actions/askedCard';
import { CHANGE_TURN } from '../actions/changeTurn'

export default (state = deck, {type, payload} = {}) => {

  switch(type) {
    case CHANGE_TURN: 
      // card that CHANGE_TURN action draws randomly from deck (deckNo = 0)
      // will be assigned to playerTurnId. 
      // console.log('random assigned card from action', payload)
      return state 
      break

    case ASKED_CARD:
      // change deck. conditionally?
      return state 
      break

    default: 
      return state  
  }
}