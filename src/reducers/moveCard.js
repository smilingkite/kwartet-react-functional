import { MOVE_CARD } from "../actions/moveCard";

export default (state = {}, {type, payload} = {}) => {

  switch(type) {
    case MOVE_CARD :
      return payload
      
    default: 
      return state  
  }
}