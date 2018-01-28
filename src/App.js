import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Card(letter, number, deckNo){
  this.letter = letter
  this.number = number
  // deckNo = 0 : card is in the deck, can be dealt
  // deckNo = 1 : card is in the hand of player 1
  // deckNo = 2 : card is in the hand of player 2
  // deckNo = 9 : card is in a kwartet (see kwartetList)
  this.deckNo = deckNo
}
const letters = ["A", "B", "C", "D", "E", "F", "G"]

function deckCards(deck = []){
  for (let i = 0; i< 7; i++){
    for (let j = 1; j < 5; j++) {
      const card = new Card(letters[i], j, 0)
      deck.push(card)
    }
  }
  return deck
}

var deck = deckCards(deck)
// console.log(deck)

// leads to problems when called for second player
const dealCard = (playerNo, deck) => {
  // deal a random card: assign one card to the player
  const deckNo = playerNo
  const random = Math.floor(Math.random() * deck.length)
  if (deck[random].deckNo === 0){
    return deck.map(card => {
      if (card.deckNo === 0 && deck[random] === card) {
        return {
          ...card, 
          deckNo
        }
      } else {
        return {...card}
      }
    })
  }
  else dealCard(playerNo, deck)
}

// doesn't take conditions into account enough
const moveCard = (deck, playerNo, cardNo, from) => {
  if (from === 0 ){
    deck[cardNo].deckNo = playerNo
  }
  return deck
}

// should use moveCard or dealCard
function dealCards(player, deck, no){
  no--
  var newDeck
  const from = 0
  const random = Math.floor(Math.random() * deck.length)
  if (deck[random].deckNo !== from) dealCards(player, deck, no)
  if (no >= 0) {
    newDeck = moveCard(deck, player, random, from)
    return dealCards(player, newDeck, no)
  } else {
    return deck
  }
}

const player1 = 1;
const player2 = 2;
// const newDeck3 = dealCards(player1, deck, 6);

// TypeError: Cannot read property 'length' of undefined (line 34, 57, 55)
const newDeck4 = dealCards(player2, dealCards(player1, deck, 6), 6);
console.log(newDeck4);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
