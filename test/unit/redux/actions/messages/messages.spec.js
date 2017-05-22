import { expect } from 'chai'
import { mockStore } from '../../../../support/setup'
import { sendMessage, receivedMessage, SEND_MESSAGE, RECEIVED_MESSAGE } from '../../../../../src/actions/messages'
import { getSampleMessages } from '../../../../support/data/messages'

describe('messages actions', () => {

  const sampleMessage = getSampleMessages(2)

  const setup = (state={}) => mockStore(state)

  describe('sendMessage', () => {

    it('broadcasts message to be sent', () => {
      const store = setup()

      store.dispatch(sendMessage(sampleMessage[0]))
      expect(store.getActions()).to.eql([
        { type: SEND_MESSAGE, payload: sampleMessage[0] },
      ])
    })
  })

  describe('receivedMessage', () => {
    const store = setup([sampleMessage[0]])

    store.dispatch(receivedMessage(sampleMessage[1]))
    expect(store.getActions()).to.eql([
      { type: RECEIVED_MESSAGE, payload: sampleMessage[1] }
    ])
  })
})