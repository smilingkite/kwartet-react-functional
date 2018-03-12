const selectTurn = (player1, player2) => {
  if (Math.random() < 0.5) {
    playerTurnID = player1.idNo;
    otherPlayerID = player2.idNo;
  } else {
    playerTurnID = player2.idNo;
    otherPlayerID = player1.idNo;
 }
}


const player1 = {}
const player2 = {}
player1.idNo = 1 ; 
player1.name = 'Aafje';
player2.idNo = 2 ; 
player2.name = 'Bennie';
var playerTurnID
var otherPlayerID

selectTurn(player1, player2);

const players = {
  player1,
  player2,
  otherPlayerID,
  playerTurnID
}

export default players