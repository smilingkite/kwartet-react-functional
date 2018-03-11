const selectHand = (deck, handNo) => deck.filter(card => card.deckNo === handNo)

const dealRandomCard = (playerNo, deck) => {
  console.log('dealing random card')
  // deal a random card: assign one card to the player
  // const deckNo = playerNo
  const random = Math.floor(Math.random() * deck.length)
  if (deck[random].deckNo === 0) {
    let kaart = deck[random];
    kaart.deckNo = playerNo
    console.log(kaart)
    return kaart
  } else if (selectHand(deck,0).length === 0) { 
    console.log('!!!!!de kaarten zijn op!');
    return {}
  } else return dealRandomCard(playerNo, deck)
}

export default dealRandomCard;