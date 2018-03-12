import React, {
  PureComponent
} from 'react';
import { connect } from 'react-redux'
import { SELECT_MESSAGE } from './actions/selectMessage'
import { MOVE_CARD } from './actions/moveCard'
import { CHANGE_TURN } from './actions/changeTurn'
import { CHECK_KWARTET } from './actions/checkKwartet'
import Card from './helpers/cardConstructor';
import dealRandomCard from './helpers/dealRandomCard';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import './App.css';

// WIP:
// *) REDUX 
      // FIX: change turn works only first time. Should deal card & change turn. 
      // kwartet handling
// *) deal with larger hands
// *) Let computer handle player2
// *) endgame
//  1) change turn automatically when no more cards in hand
//  2) popover with result & no more input option 

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.game = this.game.bind(this);
  }

  changeMessage = (message) => {
    this.props.dispatch({type: SELECT_MESSAGE, payload: message})
  }

  changeTurn = () => {
    this.props.dispatch({type: CHANGE_TURN})
  }
  
  selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
  // selectKwartet = (kwartetList, handNo) => kwartetList.filter(card => card.deckNo === handNo)

  checkKwartet = (hand, playerID) => {
    // console.log('check kwartet: hand', hand)
    let selectLetter = (hand, letter) => hand.filter(card => card.letter === letter);

    const letters = ["A", "B", "C", "D", "E", "F", "G"]

    for (let i = 0; i < letters.length; i++){
      let letter = letters[i];
      // console.log('checkKwartet > selectLetter array: ' ,selectLetter(hand,letter))
      if (selectLetter(hand,letter).length > 3) {
        for (let i = 1; i < 5; i++){
          let kaart = {};
          kaart.letter = letter;
          kaart.number = i;
          kaart.deckNo = 9
          this.props.dispatch({type: MOVE_CARD, payload: kaart})
        }
        let kwartetLetter = {}
        kwartetLetter.letter = letter
        kwartetLetter.deckNo = playerID
        this.props.dispatch({type: CHECK_KWARTET, payload: kwartetLetter})
      }
    }
  }

  dealRandomCardNow(playerTurnID, deck) {
    this.props.dispatch({ type: MOVE_CARD, payload: dealRandomCard(playerTurnID, deck) });
  }

  isLegitAskedCard = (deck, handNo, card) => {
    let hand = this.selectHand(deck,handNo)
    let cardType = hand.filter(c=> c.letter === card.letter)

    if (cardType.length > 0) return true
    else return false
  }

  hasCardInHand = (hand, kaartuitvoer) => {
    let letter = kaartuitvoer.letter
    let number = kaartuitvoer.number

    if (hand.filter(card => card.letter === letter && card.number === number).length > 0) return true
    return false
  }

  game(card) {
    card = card.toUpperCase();
    let validCard = true;
    const letterRegex = /[A-G]/;
    const numberRegex = /[1-4]/;
    const playerTurnID = this.props.players.playerTurnID;
    const otherPlayerID = this.props.players.otherPlayerID;
    const deck = this.props.deck;

    try {
      var letter = letterRegex.exec(card);
      letter = letter[0];
    } catch (e) {
      console.log('Je gaf geen geldige letter op.');
      this.changeMessage('errorLetter');
      this.changeTurn()
      this.dealRandomCardNow(playerTurnID, deck);
      validCard = false;
    }
    try {
      var number = numberRegex.exec(card);
      number = parseInt(number[0], 10);
    } catch (e) {
      console.log('Je gaf geen geldig nummer op.');
      this.changeMessage('errorNumber');

      this.changeTurn()
      this.dealRandomCardNow(playerTurnID, deck);
      validCard = false;
    }
    const kaartuitvoer = new Card(letter, number, playerTurnID);

    // also check of allowed to ask for card, in order to change turn if not.
    if (validCard) {
      if (!this.isLegitAskedCard(deck, playerTurnID, kaartuitvoer)) {
        this.changeMessage('beurtWissel');
        this.changeTurn()
        this.dealRandomCardNow(playerTurnID, deck);
      } else {
        // If card not in otherplayer hand, changeTurn
        let otherPlayerHand = this.selectHand(deck, otherPlayerID)
        if (this.hasCardInHand(otherPlayerHand, kaartuitvoer)) {
          this.props.dispatch({type: MOVE_CARD, payload: kaartuitvoer})
        } else {
          this.changeMessage('beurtWissel');
          this.checkKwartet(this.selectHand(deck, playerTurnID), playerTurnID);
          this.changeTurn()
          this.dealRandomCardNow(playerTurnID, deck);
        }
        validCard = false;
      }
    }

    return ;
  }

  render() {
    const {game, selectHand} = this; // functions
    const {message, deck, kwartetList} = this.props;
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
        <Interface onNewCard={game} />

        <div className = "Game" > 
          <PlayerComponent 
            key={1} 
            turn={true} 
            hand ={selectHand(deck, playerTurnID)} 
            name = {selectPlayerName(playerTurnID)} 
            kwartet = {selectHand(kwartetList, playerTurnID)}
          />
          <PlayerComponent 
            key={2} 
            turn={false} 
            hand ={selectHand(deck, otherPlayerID)} 
            name = {selectPlayerName(otherPlayerID)} 
            kwartet = {selectHand(kwartetList, otherPlayerID)}
          />
        </div> 
      </div>
    );
  }
}

const mapStateToProps = ({ message, deck, players, askedCard, kwartetList }) => ({
  message, deck, players, askedCard, kwartetList
})

export default connect(mapStateToProps)(App);
