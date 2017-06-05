import {expect} from 'chai'
import {mockStore} from '../../../../support/setup'
import {getSampleMidiDevices} from '../../../../support/data/midiDevices'
import {
  REGISTERED_MIDI_INPUT_DEVICE,
  registerMidiInputDevice,
  UNREGISTERED_MIDI_INPUT_DEVICE,
  unregisterMidiInputDevice
} from '../../../../../src/redux/actions/midi/input/input'
import {
  REGISTERED_MIDI_OUTPUT_DEVICE,
  registerMidiOutputDevice,
  UNREGISTERED_MIDI_OUTPUT_DEVICE,
  unregisterMidiOutputDevice
} from '../../../../../src/redux/actions/midi/output/output'

describe('midi device actions', () => {

  const sampleMidiDevices = getSampleMidiDevices(2)

  const setup = (state={}) => mockStore(state)

  describe('registerMidiInputDevice', () => {

    it('dispatches a REGISTERED_MIDI_DEVICE action', () => {
      const store = setup()

      store.dispatch(registerMidiInputDevice(sampleMidiDevices[0]))

      expect(store.getActions()).to.eql([
        { type: REGISTERED_MIDI_INPUT_DEVICE, payload: sampleMidiDevices[0] },
      ])
    })
  })

  describe('unregisterMidiInputDevice', () => {

    it('dispatches a UNREGISTERED_MIDI_INPUT_DEVICE action', () => {
      const store = setup()

      store.dispatch(unregisterMidiInputDevice(sampleMidiDevices[1]))

      expect(store.getActions()).to.eql([
        { type: UNREGISTERED_MIDI_INPUT_DEVICE, payload: sampleMidiDevices[1] },
      ])
    })
  })

  describe('registerMidiOutputDevice', () => {

    it('dispatches a REGISTERED_MIDI_INPUT_DEVICE action', () => {
      const store = setup()

      store.dispatch(registerMidiOutputDevice(sampleMidiDevices[0]))

      expect(store.getActions()).to.eql([
        { type: REGISTERED_MIDI_OUTPUT_DEVICE, payload: sampleMidiDevices[0] },
      ])
    })
  })

  describe('unregisterMidiOutputDevice', () => {

    it('dispatches a UNREGISTERED_MIDI_OUTPUT_DEVICE action', () => {
      const store = setup()

      store.dispatch(unregisterMidiOutputDevice(sampleMidiDevices[1]))

      expect(store.getActions()).to.eql([
        { type: UNREGISTERED_MIDI_OUTPUT_DEVICE, payload: sampleMidiDevices[1] },
      ])
    })
  })
})
