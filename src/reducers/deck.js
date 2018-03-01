import deck from '../data/deck'
import { ASKED_CARD } from "../actions/askedCard";

export default (state = deck, {type, payload} = {}) => {

  switch(type) {
    case ASKED_CARD:
      // change deck. conditionally?

    default: 
      return state  
  }
}