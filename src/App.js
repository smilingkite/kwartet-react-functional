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
      
      var card = new Card(letters[i], j, 0)
      
      deck.push(card)
    }
  }
  return deck
}

var deck = deckCards(deck)
console.log(deck)

const dealCard = (playerNo, deck) => {
  // deal a random card: assign one card to the player
  var deckNo = playerNo
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

function dealCards(player, deck, no){
  // deal each user no-number cards
  no--
  var newDeck
  if (no >= 0) {
    newDeck = dealCard(player,deck)
    // console.log(newDeck)
    return dealCards(player,newDeck, no)
  } else {
    // console.log(deck)
    return deck
  }
}
var player1 = 1;
var player2 = 2;
var newDeck2 = dealCards(player1, deck, 6);
console.log(newDeck2);

// TypeError: Cannot read property 'length' of undefined (line 34, 57, 55)
var newDeck3 = dealCards(player2, newDeck2, 6);
console.log(newDeck3);

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
