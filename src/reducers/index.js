import { combineReducers } from 'redux'
import moveCard from './moveCard'
import deck from './deck'
import kwartetList from './kwartet'
import messages from './messages'
import message from './message'
import players from './players'


const kwartetApp = combineReducers({
  moveCard, deck, messages, message, players, kwartetList
}) 

export default kwartetApp