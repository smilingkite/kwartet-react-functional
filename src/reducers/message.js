import messages from '../data/messages'
import {SELECT_MESSAGE} from '../actions/selectMessage'

export default (state = messages[0].value, { type, payload } = {}) => {
  
  switch(type) {
    case SELECT_MESSAGE :
      return messages.filter((message, key) => message.key === payload.key? message.value : messages[0].value)

    default:
      return state
  }
}