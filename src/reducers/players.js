import players from '../data/players'
import { CHANGE_TURN } from '../actions/changeTurn'

export default (state = players, {type} = {}) => {
  let playerTurn = players.playerTurnID
  let player1 = players.player1
  let player2 = players.player2
  let newPlayerTurn, newOtherPlayer

  switch(type) {
    case CHANGE_TURN:
      if (playerTurn === player1.idNo) {
        newPlayerTurn = player2.idNo;
        newOtherPlayer = player1.idNo;
      }
      else {
        newPlayerTurn = player1.idNo;
        newOtherPlayer = player2.idNo;
      }
      return {
        ...state,
        otherPlayerID: newOtherPlayer,
        playerTurnID: newPlayerTurn
      }

    default: 
      return state  
  }
}