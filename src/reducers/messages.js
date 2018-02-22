import messages from '../data/messages'
import {SELECT_MESSAGE} from '../actions/selectMessage'

export default (state = messages, { type, payload } = {}) => {
  
  switch(type) {

    case SELECT_MESSAGE: 
      return [Object]

    default:
    return state
  }
}