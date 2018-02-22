import messages from '../data/messages'
import {SELECT_MESSAGE} from '../actions/selectMessage'

export default (state = messages[0].value, { type, payload } = {}) => {
  
  switch(type) {
    case SELECT_MESSAGE :
      let MessageObjectArray = messages.filter((message) => message.key === payload)
      return MessageObjectArray[0].value

    default:
      return state
  }
}