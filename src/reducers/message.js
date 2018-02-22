import messages from '../data/messages'
import {SELECT_MESSAGE} from '../actions/selectMessage'

export default (state = messages[0].value, { type, payload } = {}) => {
  
  switch(type) {
    
    default:
    return state
  }
}