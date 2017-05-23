import {expect} from 'chai'
import {mockStore} from '../../../../support/setup'
import {getSampleMidiDevices} from '../../../../support/data/midiDevices'
import {
  REGISTERED_MIDI_DEVICE,
  registerMidiDevice,
  UNREGISTERED_MIDI_DEVICE,
  unregisterMidiDevice
} from '../../../../../src/redux/actions/midiDevices'

describe('midi device actions', () => {

  const sampleMidiDevices = getSampleMidiDevices(2)

  const setup = (state={}) => mockStore(state)

  describe('registerMidiDevice', () => {

    it('dispatches a REGISTERED_MIDI_DEVICE action', () => {
      const store = setup()

      store.dispatch(registerMidiDevice(sampleMidiDevices[0]))

      expect(store.getActions()).to.eql([
        { type: REGISTERED_MIDI_DEVICE, payload: sampleMidiDevices[0] },
      ])
    })
  })

  describe('unregisterMidiDevice', () => {

    it('dispatches a UNREGISTERED_MIDI_DEVICE action', () => {
      const store = setup()

      store.dispatch(unregisterMidiDevice(sampleMidiDevices[1]))

      expect(store.getActions()).to.eql([
        { type: UNREGISTERED_MIDI_DEVICE, payload: sampleMidiDevices[1] },
      ])
    })
  })
})
