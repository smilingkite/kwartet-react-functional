import deck from '../data/deck'
import { ASKED_CARD } from '../actions/askedCard';
import { CHANGE_TURN } from '../actions/changeTurn'

export default (state = deck, {type, payload} = {}) => {

  switch(type) {
    case CHANGE_TURN: 
      // draw card for current player

    case ASKED_CARD:
      // change deck. conditionally?

    default: 
      return state  
  }
}