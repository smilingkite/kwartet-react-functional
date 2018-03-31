// import Card from '../helpers/cardConstructor';
// import dealCard from '../helpers/dealCard';

import letters from './letters'

const makeKwartetList = (letters, kwartetList) => {
  for (let i=0; i<7; i++){
    const card = {};
    card.letter = letters[i];
    card.deckNo = 0;
    kwartetList.push(card)
  }
  return kwartetList
}
let kwartetList = makeKwartetList(letters, [])

export default kwartetList
