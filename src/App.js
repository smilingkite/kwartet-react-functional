import React, {
  Component
} from 'react';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import './App.css';

// WIP:
// *) endgame
//  1) change turn automatically when no more cards in hand
//  2) popover with result & no more input option 
// *) styles keep working with large hands
// *) messages

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
const makeKwartetList = (letters, kwartetList) => {
  for (let i=0; i<7; i++){
    const card = {};
    card.letter = letters[i];
    card.deckNo = 0;
    kwartetList.push(card)
  }
  return kwartetList
}
let kwartetList = makeKwartetList(letters, [])

const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

const selectKwartet = (kwartetList, handNo) => kwartetList.filter(card => card.deckNo === handNo )

function moveCard(kaart, deck, playerId) {
  const cardIndex = (kaart.letter.charCodeAt(0) - 65) * 4 - 1 + kaart.number;
  // verander deckNo van die kaart in playerId.
  deck[cardIndex].deckNo = playerId;
}

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
  } else if (selectHand(deck,0).length === 0) { 
    console.log('!!!!!de kaarten zijn op!');
    return deck;
  } else return dealCard(playerNo, deck)
}

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
// console.log(deck);

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
// console.table(selectHand(deck, playerTurnID))

function checkKwartet(deck, kwartetList, player){
  // checks if there are four card objects in the hand with the same letter
  // if so > puts letter in kwartet array
  //       > and deletes those four card objects from hand. 
  var hand = selectHand(deck,player);
  let selectLetter = (hand, letter) => hand.filter(card => card.letter === letter);
  // let kwartet = {};
  // voor elk van de waarden in letters, count number of objects.
  for (let i = 0; i < letters.length; i++){
    let letter = letters[i];
    if (selectLetter(hand,letter).length > 3) {
      // kwartet.letter = letter;
      // kwartet.playerIdNo = player;
      const cardIndex = (letter.charCodeAt(0) - 65);
      // verander deckNo van die kaart in playerTurn.
      kwartetList[cardIndex].deckNo = player;
      console.table(kwartetList);
      // move all cards with this letter to stack 9;
      for (let i = 1; i < 5; i++){
        let kaart = {};
        kaart.letter = letter;
        kaart.number = i;
        moveCard(kaart, deck, 9);
      }
    }
  }
  return kwartetList;
}

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
      validCard: true,
      kwartetList: kwartetList
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
    const validCard = true;
    let playerTurn = this.state.playerTurn;
    let otherPlayer = this.state.otherPlayer;
    let player1 = this.state.player1.idNo;
    let player2 = this.state.player2.idNo;
    let deck = dealCard(playerTurn, this.state.deck)

    kwartetList = checkKwartet(deck, kwartetList, playerTurn);

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
        deck, 
        kwartetList
      }
    );
  }
  game(card) {
    let playerTurn = this.state.playerTurn;
    let otherPlayer = this.state.otherPlayer;
    let deck = this.state.deck;
    let kaart = this.state.kaart;

    function legitRequestedCard(card, player){
      // checks whether card.letter appears in the hand of the player
      console.log('Je mag deze kaart vragen.')
      for (let c of selectHand(deck, player)) {
        if (card.letter === c.letter){
          return true;
        }
      }
      return false;
    }

    function checkCardInHand(card, deck){
      var letter = card.letter;
      var number = card.number;
      for (let c of selectHand(deck, otherPlayer)) {
        if (letter === c.letter && number === c.number){
          console.log('Goeie gok!');
          return true;
        }
      }
      console.log('De ander heeft de kaart niet')
      return false;
    }
    if (!this.state.validCard) {
      this.changeHand();    
    } else {
      console.log("card correct")
      if (legitRequestedCard(kaart, playerTurn)) {
        if (checkCardInHand(kaart, deck)) {
          moveCard(kaart, deck, playerTurn);
        } else {
          if (kaart.deckNo === playerTurn) {
            this.changeHand();
          }        
        }
      }
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
          <PlayerComponent 
            key={1} 
            turn={true} 
            hand ={selectHand(deck, playerTurn)} 
            kwartet = {selectKwartet(kwartetList, playerTurn)} 
            name = {selectPlayerName(playerTurn)} 
          />
          <PlayerComponent 
            key={2} 
            turn={false} 
            hand ={selectHand(deck, otherPlayer)} 
            kwartet = {selectKwartet(kwartetList, otherPlayer)} 
            name = {selectPlayerName(otherPlayer)} 
          />
        </div> 
      </div>
    );
  }
}

export default App;
