import { expect } from 'chai'
import {session} from '../../../../../src/redux/reducers/session'
import {getSampleSession} from '../../../../support/data/session'
import {JOINED_SESSION} from '../../../../../src/redux/actions/session'

describe('session reducer', () => {

  const sampleSession = getSampleSession()

  it('defaults to an empty ImmutableJS Map initially when state is undefined', () => {
    const state = undefined
    const action = { type: 'SOME_ARBITRARY_ACTION' }

    expect(session(state, action)).to.eql({})
  })

  it('sets the session on JOINED_SESSION', () => {
    const state = {}
    const action = { type: JOINED_SESSION, payload: sampleSession }

    expect(session(state, action)).to.eql(sampleSession)
  })
})
