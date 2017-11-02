import { expect } from 'chai'
import uuidV4 from 'uuid/v4'
import {getDefaultState} from '../../../../support/state'
import {newMidiInputDevice} from '../../../../../src/types/midiDevice'
import {getMidiInputDevices} from '../../../../../src/redux/selectors/midi/input'


describe('midi input device selectors', () => {

  const midiDevices = [
    newMidiInputDevice('deep-lake', {id: uuidV4()}),
    newMidiInputDevice('micro-ghost', {id: uuidV4()}),
    newMidiInputDevice('fermi-phantom', {id: uuidV4()}),
  ]
  
  const state =  getDefaultState({
    midi: {
      input: {
        [midiDevices[0].id]: midiDevices[0],
        [midiDevices[1].id]: midiDevices[1],
        [midiDevices[2].id]: midiDevices[2],
      },
    },
  })

  describe('#getMidiInputDevices', () => {

    it('returns an array with only the NULL_DEVICE  when no devices are present', () => {
      expect(getMidiInputDevices(getDefaultState())).to.eql([
        newMidiInputDevice(), // by default this constructor makes the NULL_DEVICE
      ])      
    })

    it('returns an array of all available midi devices', () => {
      expect(getMidiInputDevices(state)).to.eql([
        newMidiInputDevice(),
        ...midiDevices,
      ])
    })
  })
})
