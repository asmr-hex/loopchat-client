import { expect } from 'chai'
import { connection, status } from '../../../../../src/reducers/connection'
import { CONNECTING, CONNECTED, DISCONNECTED } from '../../../../../src/actions/connection/status'
import { connectionStatus } from '../../../../../src/types/connectionStatus'

describe('connection reducer', () => {

  describe('status sub-reducer', () => {
    it('is DISCONNECTED by default initially when state is undefined', () => {
      const state = undefined
      const action = { type: 'SOME_OTHER_ACTION' }

      expect(status(state, action)).to.eql(connectionStatus.DISCONNECTED)
    })

    it('updates status to CONNECTING on CONNECTING action', () => {
      const state = connectionStatus.DISCONNECTED
      const action = {
        type: CONNECTING,
      }
      expect(status(state, action)).to.eql(connectionStatus.CONNECTING)
    })

    it('updates status to CONNECTED on CONNECTED action', () => {
      const state = connectionStatus.CONNECTING
      const action = {
        type: CONNECTED,
      }
      expect(status(state, action)).to.eql(connectionStatus.CONNECTED)
    })

    it('updates status to DISCONNECTED on DISCONNECTED action', () => {
      const state = connectionStatus.CONNECTING
      const action = {
        type: DISCONNECTED,
      }
      expect(status(state, action)).to.eql(connectionStatus.DISCONNECTED)
    })
  })
})
