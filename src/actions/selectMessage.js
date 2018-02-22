export const SELECT_MESSAGE = 'SELECT_MESSAGE'

export default (message) => {
  return {
    type: SELECT_MESSAGE,
    payload: message
  }
}