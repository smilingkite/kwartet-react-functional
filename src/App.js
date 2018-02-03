import React, {
  Component
} from 'react';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import './App.css';

function Card(letter, number, deckNo) {
  this.letter = letter
  this.number = number
  // deckNo = 0 : card is in the deck, can be dealt
  // deckNo = 1 : card is in the hand of player 1
  // deckNo = 2 : card is in the hand of player 2
  // deckNo = 9 : card is in a kwartet (see kwartetList)
  this.deckNo = deckNo
}
const letters = ["A", "B", "C", "D", "E", "F", "G"]

function deckCards(deck) {
  for (let i = 0; i < 7; i++) {
    for (let j = 1; j < 5; j++) {
      const card = new Card(letters[i], j, 0)
      deck.push(card)
    }
  }
  return deck
}

var deck = deckCards([])
// console.log(deck)

const dealCard = (playerNo, deck) => {
  // deal a random card: assign one card to the player
  const deckNo = playerNo
  const random = Math.floor(Math.random() * deck.length)
  if (deck[random].deckNo === 0) {
    return deck.map(card => {
      if (card.deckNo === 0 && deck[random] === card) {
        return {
          ...card,
          deckNo
        }
      } else {
        return { ...card }
      }
    })
  } else return dealCard(playerNo, deck)
}

// should use moveCard or dealCard
const dealCards = (player, deck, no) => {
  no--
  var newDeck
  // const from = 0
  if (no >= 0) {
    newDeck = dealCard(player, deck)
    return dealCards(player, newDeck, no)
  } else {
    return deck
  }
}

const player1 = {}
const player2 = {}
player1.idNo = 1 ; 
player1.name = 'Aafje';
player2.idNo = 2 ; 
player2.name = 'Ben';
deck = dealCards(player2.idNo, dealCards(player1.idNo, deck, 6), 6);
console.log(deck);

const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
console.table(selectHand(deck, player1.idNo))

const selectPlayerName = (playerIdNo) => {
  if (playerIdNo === 1) return player1.name
  else return player2.name
}

var playerTurnID
var otherPlayerID
const selectTurn = (player1, player2) => {
  if (Math.random() < 0.5) {
    playerTurnID = player1.idNo;
    otherPlayerID = player2.idNo;
  } else {
    playerTurnID = player2.idNo;
    otherPlayerID = player1.idNo;
  }
}
selectTurn(player1, player2);
console.table(selectHand(deck, playerTurnID))

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deck: deck,
      player1: player1,
      player2: player2,
      playerTurn: playerTurnID,
      otherPlayer: otherPlayerID,
      kaart: {},
      validCard: true
    };
    this.game = this.game.bind(this);
    this.askedCard = this.askedCard.bind(this);
  }

  askedCard(card) {
    // turns string answer into card object
    card = card.toUpperCase();
    let validCard = true;
    const letterRegex = /[A-G]/;
    const numberRegex = /[1-4]/;
    try {
      var letter = letterRegex.exec(card);
      letter = letter[0];
    } catch (e) {
      console.log('Je gaf geen geldige letter op.');
      validCard = false;
    }
    try {
      var number = numberRegex.exec(card);
      number = parseInt(number[0], 10);
    } catch (e) {
      console.log('Je gaf geen geldig nummer op.');
      validCard = false;
    }
    const playerId = this.state.playerTurn;
    const kaartuitvoer = new Card(letter, number, playerId);
    console.log(kaartuitvoer);

    this.setState({ kaart: kaartuitvoer});
    this.setState({ validCard: validCard});
    return ;
  }
  changeHand() {
    // this.setState((prevState) => {
    //   return {deck: dealCard(prevState.playerTurn, prevState.deck)};
    // });

    // checkKwartet(playerTurn);
    const validCard = true;
    // this.setState({validCard})
    let playerTurn = this.state.playerTurn;
    let otherPlayer = this.state.otherPlayer;
    let player1 = this.state.player1.idNo;
    let player2 = this.state.player2.idNo;

    let deck = dealCard(playerTurn, this.state.deck)
    if (playerTurn === player1) {
      playerTurn = player2;
      otherPlayer = player1;
    }
    else {
      playerTurn = player1;
      otherPlayer = player2;
    }
    console.log('de beurt is gewisseld');
    this.setState(
      {...this.state, 
        playerTurn,
        otherPlayer, 
        validCard, 
        deck
      }
    );
  }
  game(card) {
    function legitRequestedCard(card, player){
      // checks whether card.letter appears in player.hand
      // for (let c of player.hand) {
      //   if (card.letter === c.letter){ 
      //     return true;
      //   }
      // }
      // return false;
    }

    function checkCardInHand(card, hand){
      // checks whether card is in the hand of the otherPlayer.
      // also takes the card out of the hand. 
      // var letter = card.letter;
      // var number = card.number;
      
      // for(let i = 0; i < hand.length; i++) {
      //   if(hand[i].letter === letter && hand[i].number === number) {
      //     hand.splice(i, 1);
      //     return true;
      //   }
      // }
      // return false;
    }
    if (!this.state.validCard) {
      this.changeHand();    
      console.log("change hand")
    } else {
      console.log("card correct")
    }
    return card
  }



  render() {
    const {askedCard, game} = this; // functions
    const {otherPlayer, playerTurn, deck} = this.state; // values, vars, consts etc.

    return ( 
      <div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Kwartet </h1> 
        </header> 

        <Interface onNewCard={game(askedCard)} />

        <div className = "Game" > 
          <PlayerComponent key={1} turn={true} hand ={selectHand(deck, playerTurn)} kwartet = {[]} name = {selectPlayerName(playerTurn)}  />
          <PlayerComponent key={2} turn={false} hand ={selectHand(deck, otherPlayer)} kwartet = {[]} name = {selectPlayerName(otherPlayer)}  />
        </div> 
      </div>
    );
  }
}

export default App;