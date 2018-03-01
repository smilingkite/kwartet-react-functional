import players from '../data/players'
import { CHANGE_TURN } from '../actions/changeTurn'

export default (state = players, {type, payload} = {}) => {

  switch(type) {
    case CHANGE_TURN:
      // change turn

    default: 
      return state  
  }
}