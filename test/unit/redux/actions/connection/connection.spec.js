import { expect } from 'chai'
import { mockStore } from '../../../../support/setup'
import { connectAndJoinSession, CONNECT } from '../../../../../src/actions/connection'
import { connectionStatus } from '../../../../../src/types/connectionStatus'

describe('connection actions', () => {

  const setup = (state={}) => mockStore(state)

  describe('connectAndJoinSession', () => {

    it('broadcasts the endpoint and token we wish to connect with', () => {
      const store = setup()
      const host = 'www.loop.chat'
      const port = 6666
      const sessionId = 'wildStrawberries'
      const endpoint = `ws://${host}:${port}/ws/${sessionId}`

      store.dispatch(connectAndJoinSession(host, port, sessionId))

      expect(store.getActions()).to.eql([
        { type: CONNECT, payload: { endpoint, token: '' } },
      ])
    })
  })
})