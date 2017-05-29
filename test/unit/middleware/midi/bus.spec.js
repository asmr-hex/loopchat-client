import { expect } from 'chai'
import { noop } from 'lodash'
import {mockStore} from '../../../support/setup'
import {getSampleMidiDevices} from '../../../support/data/midiDevices'
import {MidiEventBus} from '../../../../src/middleware/midi/bus'

describe('MidiEventBus', () => {

  const sampleMidiDevices = getSampleMidiDevices(3)

  const setup = (state={}) => mockStore(state)

  describe('constructor', () => {

    it('initializes dispatch to a nop', () => {
      let midiEventBus = new MidiEventBus()

      expect(midiEventBus.dispatch).to.eql(noop)
    })

    it('initializes activated to {}', () => {
      let midiEventBus = new MidiEventBus()

      expect(midiEventBus.activated).to.eql({})
    })

    it('initializes recording to {}', () => {
      let midiEventBus = new MidiEventBus()

      expect(midiEventBus.recording).to.eql({})
    })

    it('initializes assignedInstrument to {}', () => {
      let midiEventBus = new MidiEventBus()

      expect(midiEventBus.assignedInstrument).to.eql({})
    })
  })

  describe('setDispatcher', () => {

    it('sets the dispatcher method', () => {
      const store = setup()
      const action = { type: 'ARBITRARY_ACTION', payload: 666 }
      let midiEventBus = new MidiEventBus()

      midiEventBus.setDispatcher(store.dispatch)

      midiEventBus.dispatch(action)

      expect(store.getActions()).to.eql([
        action,
      ])
    })
  })

  describe('register', () => {

    it('initializes activated to false', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)

      expect(midiEventBus.activated[device.id]).to.be.false
    })

    it('initializes recording to false', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)

      expect(midiEventBus.recording[device.id]).to.be.false
    })

    it('initializes assignedInstrument to false', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)

      expect(midiEventBus.assignedInstrument[device.id]).to.eql(noop)
    })
  })


  describe('unregister', () => {

    it('initializes activated to false', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.unregister(device)

      expect(midiEventBus.activated).to.not.include({[device.id]: device})
    })

    it('initializes recording to false', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.unregister(device)

      expect(midiEventBus.recording).to.not.include({[device.id]: device})
    })

    it('initializes assignedInstrument to false', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.unregister(device)

      expect(midiEventBus.assignedInstrument).to.not.include({[device.id]: noop})
    })
  })

  describe('activateDevice', () => {

    it('does nothing if provided deviceId is not registered', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.activateDevice(device.id)

      expect(midiEventBus.activated).to.eql({})
    })

    it('sets provided registered device as activated', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.activateDevice(device.id)

      expect(midiEventBus.activated).to.eql({[device.id]: true})
    })

    it('is idempotent', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.activateDevice(device.id)
      midiEventBus.activateDevice(device.id)

      expect(midiEventBus.activated).to.eql({[device.id]: true})
    })
  })

  describe('deactivateDevice', () => {

    it('does nothing if provided deviceId is not registered', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.deactivateDevice(device.id)

      expect(midiEventBus.activated).to.eql({})
    })

    it('sets provided registered device as deactivated', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.activateDevice(device.id)
      midiEventBus.deactivateDevice(device.id)

      expect(midiEventBus.activated).to.eql({[device.id]: false})
    })

    it('is idempotent', () => {
      let midiEventBus = new MidiEventBus()
      const device = sampleMidiDevices[0]

      midiEventBus.register(device)
      midiEventBus.deactivateDevice(device.id)

      expect(midiEventBus.activated).to.eql({[device.id]: false})
    })
  })
})
