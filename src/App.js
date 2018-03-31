import React, {
  PureComponent
} from 'react';
import { connect } from 'react-redux';
import messages from './data/messages';
import { SELECT_MESSAGE } from './actions/selectMessage';
import { MOVE_CARD } from './actions/moveCard';
import { CHANGE_TURN } from './actions/changeTurn';
import { CHECK_KWARTET } from './actions/checkKwartet';
import dealRandomCard from './helpers/dealRandomCard';
import PlayerComponent from './components/Player';
import Interface from './components/Interface';
import letters from './data/letters'
import './App.css';

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.game = this.game.bind(this);
  }

  changeMessage = (message, extra) => {
    let MessageObjectArray = messages.filter((m) => m.key === message)
    let newMessage = MessageObjectArray[0].value.replace("XXX", extra);
    console.log(extra)
    console.log(newMessage)
    this.props.dispatch({type: SELECT_MESSAGE, payload: newMessage})
  }
  
  selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
  
  selectPlayerName = (playerIdNo) => {
    if (playerIdNo === 1) return this.props.players.player1.name
    else return this.props.players.player2.name
  }

  checkKwartet = (hand, playerID) => {
    let selectLetter = (hand, letter) => hand.filter(card => card.letter === letter);

    for (let i = 0; i < letters.length; i++){
      let letter = letters[i];

      if (selectLetter(hand,letter).length > 3) {
        let kwartetLetter = {}
        kwartetLetter.letter = letter
        kwartetLetter.deckNo = playerID
        this.props.dispatch({type: CHECK_KWARTET, payload: kwartetLetter})
      }
    }
  }

  onChangeTurn(deck, playerTurnID, otherPlayerID) {
    this.props.dispatch({ type: MOVE_CARD, payload: dealRandomCard(playerTurnID, deck) })
    this.checkKwartet(this.selectHand(deck, playerTurnID), playerTurnID)
    this.checkKwartet(this.selectHand(deck, otherPlayerID), otherPlayerID)
    this.props.dispatch({ type: CHANGE_TURN})
  }

  isLegitAskedCard = (deck, handNo, card) => {
    let hand = this.selectHand(deck,handNo)
    let cardType = hand.filter(c=> c.letter === card.letter)
    return cardType.length > 0
  }

  hasCardInHand = (hand, kaartuitvoer) => {
    let letter = kaartuitvoer.letter
    let number = kaartuitvoer.number
    if (hand.filter(card => (card.letter === letter && card.number === number)).length > 0) return true
    return false
  }

  game(card) {
    let validCard = true;
    const playerTurnID = this.props.players.playerTurnID;
    const otherPlayerID = this.props.players.otherPlayerID;
    const deck = this.props.deck;

    const kaartuitvoer = card 
    kaartuitvoer.deckNo = playerTurnID

    // also check of allowed to ask for card, in order to change turn if not.
    if (validCard) {
      if (!this.isLegitAskedCard(deck, playerTurnID, kaartuitvoer)) {
        this.changeMessage('beurtWissel', this.selectPlayerName(otherPlayerID));
        this.onChangeTurn(deck, playerTurnID, otherPlayerID);
      } else {
        // If card not in otherplayer hand, changeTurn
        let otherPlayerHand = this.selectHand(deck, otherPlayerID)
        if (this.hasCardInHand(otherPlayerHand, kaartuitvoer)) {
          this.props.dispatch({type: MOVE_CARD, payload: kaartuitvoer})
          this.changeMessage('goeieGok' , this.selectPlayerName(otherPlayerID))
          this.checkKwartet(this.selectHand(deck, playerTurnID), playerTurnID);
        } else {
          this.changeMessage('beurtWissel', this.selectPlayerName(otherPlayerID));
          this.onChangeTurn(deck, playerTurnID, otherPlayerID);
        }
        validCard = false;
      }
    }
  }

  render() {
    const {game, selectHand, selectPlayerName} = this; // functions
    const {message, deck, kwartetList} = this.props;
    const {playerTurnID} = this.props.players;

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
            turn={playerTurnID === 1} 
            hand ={selectHand(deck, 1)} 
            name = {selectPlayerName(1)} 
            kwartet = {selectHand(kwartetList, 1)}
          />
          <PlayerComponent 
            key={2} 
            turn={playerTurnID === 2} 
            hand ={selectHand(deck, 2)} 
            name = {selectPlayerName(2)} 
            kwartet = {selectHand(kwartetList, 2)}
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