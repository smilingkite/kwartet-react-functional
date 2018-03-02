import { combineReducers } from 'redux'
import askedCard from './askedCard'
import deck from './deck'
import messages from './messages'
import message from './message'
import players from './players'


const kwartetApp = combineReducers({
  askedCard, deck, messages, message, players,
}) 

export default kwartetApp