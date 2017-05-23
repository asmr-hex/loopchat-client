import { expect } from 'chai'
import { midiDevices } from '../../../../../src/redux/reducers/midiDevices'
import { REGISTERED_MIDI_DEVICE, UNREGISTERED_MIDI_DEVICE } from '../../../../../src/redux/actions/midiDevices'
import {getSampleMidiDevices} from '../../../../support/data/midiDevices'

describe('midiDevices reducer', () => {

  const sampleMidiDevices = getSampleMidiDevices(2)

  it('defaults to an empty object {} initially when state is undefined', () => {
    const state = undefined
    const action = { type: 'SOME_ARBITRARY_ACTION' }

    expect(midiDevices(state, action)).to.eql({})
  })

  it('adds a midiDevice byId on REGSTERED_MIDI_DEVICE', () => {
    const state = {}
    const action = { type: REGISTERED_MIDI_DEVICE, payload: sampleMidiDevices[0] }

    expect(midiDevices(state, action)).to.eql({
      [sampleMidiDevices[0].id]: sampleMidiDevices[0],
    })
  })

  it('removes a midiDevice byId on UNREGISTERED_MIDI_DEVICE', () => {
    const state = {
      [sampleMidiDevices[0].id]: sampleMidiDevices[0],
      [sampleMidiDevices[1].id]: sampleMidiDevices[1],
    }
    const action = { type: UNREGISTERED_MIDI_DEVICE, payload: sampleMidiDevices[1] }

    expect(midiDevices(state, action)).to.eql({
      [sampleMidiDevices[0].id]: sampleMidiDevices[0],
    })
  })
})
