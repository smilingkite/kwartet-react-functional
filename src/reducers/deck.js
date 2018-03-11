import deck from '../data/deck'
import { ASKED_CARD } from '../actions/askedCard';
import { CHANGE_TURN } from '../actions/changeTurn'

// necessary information from store state:
// * playerturnID (in askedCard!)
// * > otherplayerID

export default (state = deck, {type, payload} = {}) => {

  switch(type) {
    case CHANGE_TURN: 
      // card that CHANGE_TURN action draws randomly from deck (deckNo = 0)
      // will be assigned to playerTurnId. 
      // console.log('random assigned card from action', payload)
      return state 
      // break

    case ASKED_CARD:
      // change deck. conditionally:
      // if 1) card is valid & 2) card-letter in hand playerturn & (these still handled in app.js)
      // 3) card in hand otherplayer (should be handled here)
      // > 'move' card from otherplayerhand to playerturn hand. 
      // Payload: Card {letter: "B", number: 1, deckNo: 1}
      // const cardIndex = (kaart.letter.charCodeAt(0) - 65) * 4 - 1 + kaart.number;
      // deck[cardIndex].deckNo = playerId;

      const updatedItems = state.map(item => {
        if(item.letter === payload.letter && item.number === payload.number){
          if (item.deckNo === 0) {
            return item
            // & change turn!
          }
          else return payload
        }
        return item
      })
      return updatedItems

      // return state 
      // break

    default: 
      return state  
  }
}