import React, {
  Component
} from 'react';
import logo from './logo.svg';
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

// leads to problems when called for second player
function dealCard (playerNo, deck) {
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
function dealCards(player, deck, no) {
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

const player1 = 1;
const player2 = 2;
deck = dealCards(player2, dealCards(player1, deck, 6), 6);
console.log(deck);

const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)
console.log(selectHand(deck, player1))

class App extends Component {
  render() {
    return ( 
      <div className = "App" >
        <header className = "App-header" >
          <img src = {logo}
            className = "App-logo"
            alt = "logo" 
          />
          <h1 className = "App-title" > Welcome to React </h1> 
        </header> 
        <p className = "App-intro" >
          To get started, edit < code > src / App.js < /code> and save to reload. 
        </p> 
      </div>
    );
  }
}

export default App;