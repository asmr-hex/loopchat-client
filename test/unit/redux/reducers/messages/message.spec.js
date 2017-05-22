import { expect } from 'chai'
import { getSampleMessages } from '../../../../support/data/messages'
import { sent, received } from '../../../../../src/reducers/messages'
import { SEND_MESSAGE, RECEIVED_MESSAGE } from '../../../../../src/actions/messages'

describe('messages reducer', () => {

  const sampleMessages = getSampleMessages(3)

  describe('sent sub-reducer', () => {

    it('has a default state when state is undefined', () => {
      const state = undefined
      const action = { type: 'SOME_OTHER_ACTION' }

      expect(sent(state, action)).to.eql([])
    })

    it('appends sent messages on SEND_MESSAGE', () => {
      const state = []
      const action = {
        type: SEND_MESSAGE,
        payload: sampleMessages[0]
      }
      expect(sent(state, action)).to.eql([
        sampleMessages[0],
      ])
    })
  })

  describe('received sub-reducer', () => {

    it('has a default state when state is undefined', () => {
      const state = undefined
      const action = { type: 'SOME_OTHER_ACTION' }

      expect(received(state, action)).to.eql([])
    })

    it('appends received messages on RECEIVED_MESSAGE', () => {
      const state = []
      const action = {
        type: RECEIVED_MESSAGE,
        payload: sampleMessages[0]
      }
      expect(received(state, action)).to.eql([
        sampleMessages[0],
      ])
    })
  })
})










