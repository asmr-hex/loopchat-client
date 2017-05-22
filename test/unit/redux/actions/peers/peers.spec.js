import { expect } from 'chai'
import { mockStore } from '../../../../support/setup'
import {getSamplePeers} from '../../../../support/data/peers'
import {JOINED_BY_PEERS, joinedByPeers} from '../../../../../src/actions/peers'

describe('peer actions', () => {

  const samplePeers = getSamplePeers(3)

  const setup = (state={}) => mockStore(state)

  describe('joinedByPeers', () => {

    it('dispatches an array of peers', () => {
      const store = setup()

      store.dispatch(joinedByPeers(samplePeers))
      expect(store.getActions()).to.eql([
        { type: JOINED_BY_PEERS, payload: samplePeers },
      ])
    })
  })
})
