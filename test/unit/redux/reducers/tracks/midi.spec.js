import {expect} from 'chai'
import uuidV4 from 'uuid/v4'
import {
  MIDI_TRACK_CREATED,
  MIDI_TRACK_DELETED,
  MIDI_TRACK_INPUT_DEVICE_ASSIGNED,
  MIDI_TRACK_ACTIVATED,
  MIDI_TRACK_DEACTIVATED,
} from '../../../../../src/redux/actions/tracks/midi'
import {newMidiTrack} from '../../../../../src/types/track'
import {
  midi,
  updateMidiTrackInputDevice,
  updateMidiTrackActivation,
} from '../../../../../src/redux/reducers/tracks/midi'


describe('midi track reducer', () => {

  describe('#midi', () => {

    it('adds a new midi track entry with a new recordingId on MIDI_TRACK_CREATED', () => {
      const action = {type: MIDI_TRACK_CREATED, payload: {trackId: uuidV4(), recordingId: uuidV4()}}
      const beforeState = {}

      expect(midi(beforeState, action)).to.eql({
        [action.payload.trackId]: newMidiTrack(action.payload.trackId, {recordingId: action.payload.recordingId}),
      })
    })

    it('removes a given midi track on MIDI_TRACK_DELETED', () => {
      const action = {type: MIDI_TRACK_DELETED, payload: {trackId: uuidV4()}}
      const beforeState = {
        [action.payload.trackId]: newMidiTrack(action.payload.trackId),
      }

      expect(midi(beforeState, action)).to.eql({})
    })

    it('updates midi input device on MIDI_TRACK_INPUT_DEVICE_ASSIGNED', () => {
      const action = {
        type: MIDI_TRACK_INPUT_DEVICE_ASSIGNED,
        payload: {
          trackId: 'harsh-noise',
          deviceId: 'r3l4x-1f-u-c4n',
        },
      }
      const beforeState = {
        [action.payload.trackId]: newMidiTrack(action.payload.trackId),
      }

      expect(midi(beforeState, action)).to.eql({
        [action.payload.trackId]: newMidiTrack(action.payload.trackId, {inputDeviceId: action.payload.deviceId}),
      })
    })

    it('activates a track on MIDI_TRACK_ACTIVATED', () => {
      const action = {type: MIDI_TRACK_ACTIVATED, payload: {trackId: 'angle-grinder'}}
      const beforeState = {
        [action.payload.trackId]: newMidiTrack(action.payload.trackId),
      }

      expect(midi(beforeState, action)).to.eql({
        [action.payload.trackId]: newMidiTrack(action.payload.trackId, {activated: true}),
      })
    })

    it('deactivates a track on MIDI_TRACK_DEACTIVATED', () => {
      const action = {type: MIDI_TRACK_DEACTIVATED, payload: {trackId: 'angle-grinder'}}
      const beforeState = {
        [action.payload.trackId]: newMidiTrack(action.payload.trackId, {activated: true}),
      }

      expect(midi(beforeState, action)).to.eql({
        [action.payload.trackId]: newMidiTrack(action.payload.trackId, {activated: false}),
      })
    })
  })

  describe('#updateMidiTrackInputDevice', () => {

    it('changes the midi input devices for the given track', () => {
      const midiTrack = newMidiTrack()
      const beforeState = {
        [midiTrack.id]: midiTrack,
      }
      const newDeviceId = 'deadf00d'

      expect(updateMidiTrackInputDevice(beforeState, midiTrack.id, newDeviceId)).to.eql({
        [midiTrack.id]: {
          ...midiTrack,
          inputDeviceId: newDeviceId,
        },
      })
    })
  })

  describe('#updateMidiTrackActivation', () => {

    it('changes the midi track activation status', () => {
      const midiTrack = newMidiTrack()
      const beforeState = {
        [midiTrack.id]: midiTrack,
      }

      expect(updateMidiTrackActivation(beforeState, midiTrack.id, true)).to.eql({
        [midiTrack.id]: {
          ...midiTrack,
          activated: true,
        },        
      })
    })
  })
})
