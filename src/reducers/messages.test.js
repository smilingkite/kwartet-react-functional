import messages from './messages'

describe('messages reducer', () => {
  const reducer = messages
  const initialState = []

  it('returns an empty array for the initial state', () => {
    expect(reducer()).toEqual(initialState)
  })
})