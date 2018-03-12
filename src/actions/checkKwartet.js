export const CHECK_KWARTET = 'CHECK_KWARTET'
export default (letter) => {
  console.log('check kwartet action; payload: ', letter)
  return {
    type: CHECK_KWARTET,
    payload: letter
  }
}