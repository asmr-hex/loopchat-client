import { expect } from 'chai'
import {getSampleMidiDevices} from '../../../../support/data/midiDevices'
import {input} from '../../../../../src/redux/reducers/midi/input/input'
import {
  REGISTERED_MIDI_INPUT_DEVICE,
  UNREGISTERED_MIDI_INPUT_DEVICE
} from '../../../../../src/redux/actions/midi/input/input'
import {output} from '../../../../../src/redux/reducers/midi/output/output'
import {
  REGISTERED_MIDI_OUTPUT_DEVICE,
  UNREGISTERED_MIDI_OUTPUT_DEVICE
} from '../../../../../src/redux/actions/midi/output/output'
import {ACTIVATE_MIDI_INPUT_DEVICE, DEACTIVATE_MIDI_INPUT_DEVICE} from '../../../../../src/redux/actions/midi/index'

describe('midi reducer', () => {

  const sampleMidiDevices = getSampleMidiDevices(2)

  describe('input sub-reducer', () => {

    it('defaults to an empty object {} initially when state is undefined', () => {
      const state = undefined
      const action = { type: 'SOME_ARBITRARY_ACTION' }

      expect(input(state, action)).to.eql({})
    })

    it('adds a midiDevice byId on REGSTERED_MIDI_INPUT_DEVICE', () => {
      const state = {}
      const action = { type: REGISTERED_MIDI_INPUT_DEVICE, payload: sampleMidiDevices[0] }

      expect(input(state, action)).to.eql({
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
      })
    })

    it('removes a midiDevice byId on UNREGISTERED_MIDI_INPUT_DEVICE', () => {
      const state = {
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
        [sampleMidiDevices[1].id]: sampleMidiDevices[1],
      }
      const action = { type: UNREGISTERED_MIDI_INPUT_DEVICE, payload: sampleMidiDevices[1] }

      expect(input(state, action)).to.eql({
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
      })
    })

    it('sets a midiDevice activated status on ACTIVATE_MIDI_INPUT_DEVICE', () => {
      const state = {
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
        [sampleMidiDevices[1].id]: sampleMidiDevices[1],
      }
      const action = { type: ACTIVATE_MIDI_INPUT_DEVICE, payload: sampleMidiDevices[0].id }

      expect(input(state, action)).to.eql({
        [sampleMidiDevices[0].id]: { ...sampleMidiDevices[0], activated: true },
        [sampleMidiDevices[1].id]: sampleMidiDevices[1],
      })
    })

    it('sets a midiDevice activated status on DEACTIVATE_MIDI_INPUT_DEVICE', () => {
      const state = {
        [sampleMidiDevices[0].id]: {...sampleMidiDevices[0], activated: true },
        [sampleMidiDevices[1].id]: {...sampleMidiDevices[1], activated: true },
      }
      const action = { type: DEACTIVATE_MIDI_INPUT_DEVICE, payload: sampleMidiDevices[0].id }

      expect(input(state, action)).to.eql({
        [sampleMidiDevices[0].id]: { ...sampleMidiDevices[0], activated: false },
        [sampleMidiDevices[1].id]: {...sampleMidiDevices[1], activated: true },
      })
    })
  })

  describe('output sub-reducer', () => {

    it('defaults to an empty object {} initially when state is undefined', () => {
      const state = undefined
      const action = { type: 'SOME_ARBITRARY_ACTION' }

      expect(output(state, action)).to.eql({})
    })

    it('adds a midiDevice byId on REGSTERED_MIDI_OUTPUT_DEVICE', () => {
      const state = {}
      const action = { type: REGISTERED_MIDI_OUTPUT_DEVICE, payload: sampleMidiDevices[0] }

      expect(output(state, action)).to.eql({
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
      })
    })

    it('removes a midiDevice byId on UNREGISTERED_MIDI_OUTPUT_DEVICE', () => {
      const state = {
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
        [sampleMidiDevices[1].id]: sampleMidiDevices[1],
      }
      const action = { type: UNREGISTERED_MIDI_OUTPUT_DEVICE, payload: sampleMidiDevices[1] }

      expect(output(state, action)).to.eql({
        [sampleMidiDevices[0].id]: sampleMidiDevices[0],
      })
    })
  })
})
