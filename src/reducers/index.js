import { combineReducers } from 'redux'
import messages from './messages'
import message from './message'
import deck from './deck'
import players from './players'
import askedCard from './askedCard'

const kwartetApp = combineReducers({
  messages, message, deck, players, askedCard
}) 

export default kwartetApp