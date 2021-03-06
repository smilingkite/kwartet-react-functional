import kwartetList from '../data/kwartet'
import { CHECK_KWARTET } from '../actions/checkKwartet';

export default (state = kwartetList, {type, payload} = {}) => {

  switch(type) {

    case CHECK_KWARTET:
      const updatedItems = state.map(item => {
        if(item.letter === payload.letter){
          return {...payload, hasChanged: true}
        }
        return {...item, hasChanged: false}
      })
      return updatedItems

    default: 
      return state  
  }
}