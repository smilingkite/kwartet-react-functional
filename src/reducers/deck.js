import deck from '../data/deck'
import { MOVE_CARD } from '../actions/moveCard';
import { CHECK_KWARTET } from '../actions/checkKwartet';

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

    case CHECK_KWARTET:
      const updateKwartet = state.map(item => {
      if(item.letter === payload.letter){
        return {...payload, deckNo: 9}
      }
      return {...item, hasChanged: false}
      })
      return updateKwartet

    default: 
      return state  
  }
}