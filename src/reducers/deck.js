import deck from '../data/deck'
import { MOVE_CARD } from '../actions/moveCard';

export default (state = deck, {type, payload} = {}) => {

  switch(type) {

    case MOVE_CARD:
      const updatedItems = state.map(item => {
        if(item.letter === payload.letter && item.number === payload.number){

          return {...payload, hasChanged: true}
        }
        return {...item, hasChanged: false}
      })
      return updatedItems

    default: 
      return state  
  }
}