const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

const dealRandomCard = (playerNo, deck) => {
  // deal a random card: assign one card to the player
  // const deckNo = playerNo
  const random = Math.floor(Math.random() * deck.length)
  if (deck[random].deckNo === 0) {
    return deck[random]
  } else if (selectHand(deck,0).length === 0) { 
    console.log('!!!!!de kaarten zijn op!');
    return {}
  } else return dealRandomCard(playerNo, deck)
}

export default dealRandomCard;