import { expect } from 'chai'
import uuidV4 from 'uuid/v4'
import {
  MIDI_TRACK_CREATED,
  MIDI_TRACK_DELETED,
} from '../../../../../../src/redux/actions/tracks/midi'
import {newMidiTrack} from '../../../../../../src/types/track'
import {midi} from '../../../../../../src/redux/reducers/ui/tracks/midi'


describe('midi track ui reducer', () => {

  describe('#midi', () => {

    it('returns an empty object as the default state', () => {
      expect(midi({}, {type: 'NULL_ACTION'})).to.eql({})
    })

    it('returns a by-id map with a new midi track on MIDI_TRACK_CREATED', () => {
      const beforeState = {}
      const action = {type: MIDI_TRACK_CREATED, payload: {id: uuidV4()}}
      
      expect(midi(beforeState, action)).to.eql({
        [action.payload.id]: newMidiTrack(action.payload.id),
      })
    })

    it('returns an a by-id map without a deleted track on MIDI_TRACK_DELETED', () => {
      const action = {type: MIDI_TRACK_DELETED, payload: {id: uuidV4()}}
      const beforeState = {
        [action.payload.id]: newMidiTrack(action.payload.id),
      }

      expect(midi(beforeState, action)).to.eql({})
    })
  })
})
