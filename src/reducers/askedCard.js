import { ASKED_CARD } from "../actions/askedCard";

export default (state = {}, {type, payload} = {}) => {

  switch(type) {
    case ASKED_CARD :
      return payload
      
    default: 
      return state  
  }
}