export const CHECK_KWARTET = 'CHECK_KWARTET'
export default (letter) => {

  return {
    type: CHECK_KWARTET,
    payload: letter
  }
}