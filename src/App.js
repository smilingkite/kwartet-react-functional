import React, {
  PureComponent
} from 'react';
import { connect } from 'react-redux'
import { SELECT_MESSAGE } from './actions/selectMessage'
import { ASKED_CARD } from './actions/askedCard'
import { CHANGE_TURN } from './actions/changeTurn'
import Card from './helpers/cardConstructor';
import dealRandomCard from './helpers/dealRandomCard';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import './App.css';

// WIP:
// *) REDUX 
      // game logic in redux???:
      //  * change turn if user asks for card they don't have the letter of in hand
      //  * draw random card when changing turn. 
      // kwartet handling
// *) Let computer handle player2
// *) endgame
//  1) change turn automatically when no more cards in hand
//  2) popover with result & no more input option 

// const letters = ["A", "B", "C", "D", "E", "F", "G"]
// let kwartetList = makeKwartetList(letters, [])

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.askedCard = this.askedCard.bind(this);
  }

  changeMessage = (message) => {
    this.props.dispatch({type: SELECT_MESSAGE, payload: message})
  }

  changeTurn = (card) => {
    this.props.dispatch({type: CHANGE_TURN, payload: card})
  }

  selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

  legitAskedCard = (deck, handNo, card) => {
    // console.log('in legitaskedcard')
    let hand = this.selectHand(deck,handNo)
    // console.log(hand)
    let cardType = hand.filter(c=> c.letter === card.letter)
    // console.log('selected by letter', (cardType.length > 0))
    if (cardType.length > 0) return true
    else return false
  }

  askedCard(card) {
    // turns string answer into card object
    card = card.toUpperCase();
    let validCard = true;
    const letterRegex = /[A-G]/;
    const numberRegex = /[1-4]/;
    const playerTurnID = this.props.players.playerTurnID;
    const deck = this.props.deck;

    try {
      var letter = letterRegex.exec(card);
      letter = letter[0];
    } catch (e) {
      console.log('Je gaf geen geldige letter op.');
      this.changeMessage('errorLetter');
      this.changeTurn(dealRandomCard(playerTurnID, deck));
      validCard = false;
    }
    try {
      var number = numberRegex.exec(card);
      number = parseInt(number[0], 10);
    } catch (e) {
      console.log('Je gaf geen geldig nummer op.');
      this.changeMessage('errorNumber');
      this.changeTurn(dealRandomCard(playerTurnID, deck));
      validCard = false;
    }
    const kaartuitvoer = new Card(letter, number, playerTurnID);
    console.log('in app.js', kaartuitvoer);

    // also check of allowed to ask for card, in order to change turn if not.
    if (validCard) {
      if (!this.legitAskedCard(deck, playerTurnID, kaartuitvoer)) {
        this.changeTurn(dealRandomCard(playerTurnID, deck))
      } else {
        // WIP - if card not in otherplayer hand, changeTurn
        this.props.dispatch({type: ASKED_CARD, payload: kaartuitvoer})
        validCard = false;
      }
    }

    return ;
  }

  render() {
    const {askedCard, selectHand} = this; // functions
    const {message, deck} = this.props;
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
        <Interface onNewCard={askedCard} />

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
