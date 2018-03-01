export const CHANGE_TURN = 'CHANGE_TURN'

export default (card) => {
  return {
    type: CHANGE_TURN,
    payload: card
  }
}