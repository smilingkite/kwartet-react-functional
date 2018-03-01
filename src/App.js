import React, {
  PureComponent
} from 'react';
import { connect } from 'react-redux'
import { SELECT_MESSAGE } from './actions/selectMessage'
import { ASKED_CARD } from './actions/askedCard'
import Card from './helpers/cardConstructor';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import './App.css';

// WIP:
// *) REDUX
      // connect interface to redux
        // use 'input.value.trim()' logic on interface component 
        // (see: https://redux.js.org/basics/usage-with-react)
        // will hopefully prevent endless loop
      // move card in redux
      // game logic in redux
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

const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

// const letters = ["A", "B", "C", "D", "E", "F", "G"]
// let kwartetList = makeKwartetList(letters, [])

class App extends PureComponent {

  constructor(props) {
    super(props);
    // this.state = {
    //   kaart: {},
    //   validCard: true,
    //   kwartetList: kwartetList,
    // };
    this.game = this.game.bind(this);
    this.askedCard = this.askedCard.bind(this);
    // this.changeHand = this.changeHand.bind(this);
  }

  askedCard(card) {
    // turns string answer into card object
    card = card.toUpperCase();
    console.log('in asked Card function')
    console.log(card)
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
    const playerTurnID = this.props.players.playerTurnID;
    console.log(playerTurnID)
    const kaartuitvoer = new Card(letter, number, playerTurnID);
    console.log(kaartuitvoer);
    if (validCard) this.props.dispatch({type: ASKED_CARD, payload: kaartuitvoer})
    // this.setState({ validCard: validCard});
    return ;
  }

  changeMessage = (message) => {
    this.props.dispatch({type: SELECT_MESSAGE, payload: message})
  }

  selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

  changeHand() {

  }
  game(card) {

    return card
  }

  render() {
    const {askedCard, game, selectHand} = this; // functions
    const {message, deck, card} = this.props;
    const {otherPlayerID, playerTurnID, player1, player2} = this.props.players;

    const selectPlayerName = (playerIdNo) => {
      if (playerIdNo === 1) return player1.name
      else return player2.name
    }

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
            hand ={selectHand(deck, playerTurnID)} 
            name = {selectPlayerName(playerTurnID)} 
          />
          <PlayerComponent 
            key={2} 
            turn={false} 
            hand ={selectHand(deck, otherPlayerID)} 
            name = {selectPlayerName(otherPlayerID)} 
          />
        </div> 
      </div>
    );
  }
}

const mapStateToProps = ({ message, deck, players, askedCard }) => ({
  message, deck, players, askedCard
})

export default connect(mapStateToProps)(App);
