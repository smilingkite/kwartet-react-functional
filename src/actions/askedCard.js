export const ASKED_CARD = 'ASKED_CARD'

export default (card) => {
  return {
    type: ASKED_CARD,
    payload: card
  }
}