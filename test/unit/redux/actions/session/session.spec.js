import { expect } from 'chai'
import { mockStore } from '../../../../support/setup'
import {JOINED_SESSION, joinedSession} from '../../../../../src/actions/session'
import {getSampleSession} from '../../../../support/data/session'

describe('session actions', () => {

  const sampleSession = getSampleSession()

  const setup = (state={}) => mockStore(state)

  describe('joinedSession', () => {

    it('dispatches JOINED_SESSION', () => {
      const store = setup()

      store.dispatch(joinedSession(sampleSession))

      expect(store.getActions()).to.eql([
        { type: JOINED_SESSION, payload: sampleSession }
      ])
    })
  })
})
