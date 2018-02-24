import React, {
  PureComponent
} from 'react';
import { connect } from 'react-redux'
import { SELECT_MESSAGE } from './actions/selectMessage'
import Card from './helpers/cardConstructor';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import './App.css';

// WIP:
// *) REDUX
// *) Let computer handle player2
// *) endgame
//  1) change turn automatically when no more cards in hand
//  2) popover with result & no more input option 
// *) styles keep working with large hands


function moveCard(kaart, deck, playerId) {
  const cardIndex = (kaart.letter.charCodeAt(0) - 65) * 4 - 1 + kaart.number;
  // verander deckNo van die kaart in playerId.
  deck[cardIndex].deckNo = playerId;
  return deck;
  // *** attempt at a more functional version of this function.
  // var deckNo = playerId
  // deck = deck.map(c => {
  //   if (c.letter === kaart.letter && c.number === kaart.number) {return {...c, deckNo}} else {return {...c}}
  // })
  // return deck;
}

const selectPlayerName = (playerIdNo) => {
  if (playerIdNo === 1) return player1.name
  else return player2.name
}

const selectTurn = (player1, player2) => {
  if (Math.random() < 0.5) {
    playerTurnID = player1.idNo;
    otherPlayerID = player2.idNo;
  } else {
    playerTurnID = player2.idNo;
    otherPlayerID = player1.idNo;
  }
}

const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

const letters = ["A", "B", "C", "D", "E", "F", "G"]
let kwartetList = makeKwartetList(letters, [])

const player1 = {}
const player2 = {}
player1.idNo = 1 ; 
player1.name = 'Aafje';
player2.idNo = 2 ; 
player2.name = 'Bennie';
var playerTurnID
var otherPlayerID

selectTurn(player1, player2);

class App extends PureComponent {

  constructor(props) {
    super(props);
    // this.state = {
    //   player1: player1,
    //   player2: player2,
    //   playerTurn: playerTurnID,
    //   otherPlayer: otherPlayerID,
    //   kaart: {},
    //   validCard: true,
    //   kwartetList: kwartetList,
    // };
    this.game = this.game.bind(this);
    this.askedCard = this.askedCard.bind(this);
    this.changeHand = this.changeHand.bind(this);
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

    // this.setState({ kaart: kaartuitvoer});
    // this.setState({ validCard: validCard});
    return ;
  }

  changeMessage = (message) => {
    this.props.dispatch({type: SELECT_MESSAGE, payload: message})
  }

  selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

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
    this.changeMessage("beurtWissel");
    // this.setState(
    //   {...this.state, 
    //     playerTurn,
    //     otherPlayer, 
    //     validCard, 
    //     deck, 
    //     kwartetList
    //   }
    // );
  }
  game(card) {
    // let playerTurn = this.state.playerTurn;
    // let otherPlayer = this.state.otherPlayer;
    // let deck = this.state.deck;
    // let kaart = this.state.kaart;

    function legitRequestedCard(card, player){
      // checks whether card.letter appears in the hand of the player

      for (let c of selectHand(deck, player)) {
        if (card.letter === c.letter){
          console.log('Je mag deze kaart vragen.')
          return true;
        }
      }
      console.log('Je mag deze kaart niet vragen.')
      return false;
    }

    function checkCardInHand(card, deck){
      var letter = card.letter;
      var number = card.number;
      for (let c of this.selectHand(deck, otherPlayer)) {
        if (letter === c.letter && number === c.number){
          return true;
        }
      }
      return false;
    }

    if (!this.state.validCard) {
      this.changeHand();    
    } else {
      if (kaart.deckNo === playerTurn && legitRequestedCard(kaart, playerTurn)) {
        if (checkCardInHand(kaart, deck)) {
          console.log("Goeie Gok!")
          // this.changeMessage("goeieGok");
          deck = moveCard(kaart, deck, playerTurn);
          kwartetList = checkKwartet(deck, kwartetList, playerTurn);
        } else {
          console.log('De ander heeft de kaart niet')
          this.changeHand();      
        }
      } else if (kaart.deckNo === playerTurn) {
        this.changeHand();  
      }
    }
    return card
  }

  render() {
    const {askedCard, game, selectHand} = this; // functions
    // const {otherPlayer, playerTurn} = this.state; // values, vars, consts etc.
    const {message, deck} = this.props;
    return ( 
      <div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Kwartet </h1> 
        </header> 
        <p className = "message" >{message}</p>
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

const mapStateToProps = ({ message, deck }) => ({
  message, deck
})

export default connect(mapStateToProps)(App);
