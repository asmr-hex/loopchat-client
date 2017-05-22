import { expect } from 'chai'
import { peers } from '../../../../../src/reducers/peers'
import { JOINED_BY_PEERS } from '../../../../../src/actions/peers'
import { getSamplePeers } from '../../../../support/data/peers'

describe('peers reducer', () => {

  const samplePeers = getSamplePeers(2)

  it('defaults to an empty array initially when state is undefined', () => {
    const state = undefined
    const action = { type: 'SOME_ARBITRARY_ACTION' }

    expect(peers(state, action)).to.eql([])
  })

  it('appends peers to the state on JOINED_BY_PEERS', () => {
    const state = []
    const action = { type: JOINED_BY_PEERS, payload: samplePeers }

    expect(peers(state, action)).to.eql(samplePeers)
  })
})
