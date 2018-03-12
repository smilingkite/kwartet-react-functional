export const MOVE_CARD = 'MOVE_CARD'

export default (card) => {
  return {
    type: MOVE_CARD,
    payload: card
  }
}