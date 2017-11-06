import {expect} from 'chai'
import {newRecordingContext} from '../../../../../../src/types/recording'
import {newProcessedMidiEvent} from '../../../../../../src/types/midiEvent'
import {newOverdub} from '../../../../../../src/types/recording'
import {
  MIDI_OVERDUB_RECORDING_STARTED,
  MIDI_OVERDUB_RECORDING_STOPPED,
  MIDI_EVENT_RECORDED,
} from '../../../../../../src/redux/actions/recordings/midi/midi'
import {overdubs} from '../../../../../../src/redux/reducers/recordings/midi/overdubs'


describe('midi recording overdubs reducer', () => {

  describe('#overdubs', () => {

    it('creates an empty map as default state', () => {
      expect(overdubs({}, {type: 'NULL_ACTION'})).to.eql({})
    })
    
    it('creates an overdub(s) on MIDI_OVERDUB_RECORDING_STARTED given a recording context', () => {
      const action = {
        type: MIDI_OVERDUB_RECORDING_STARTED,
        payload: {
          recordingContexts: [
            newRecordingContext('testTrackId1', 'testInputDeviceId'),
            newRecordingContext('testTrackId2', 'testInputDeviceId'),
          ],
        },
      }
      const state = {}

      expect(overdubs(state, action)).to.eql({
        [action.payload.recordingContexts[0].overdub.id]: action.payload.recordingContexts[0].overdub,
        [action.payload.recordingContexts[1].overdub.id]: action.payload.recordingContexts[1].overdub,
      })
    })

    it('removes an overdub(s) on MIDI_OVERDUB_RECORDING_STOPPED given a recording context', () => {
      const action = {
        type: MIDI_OVERDUB_RECORDING_STOPPED,
        payload: {
          recordingContexts: [
            newRecordingContext('testTrackId1', 'testInputDeviceId'),
            newRecordingContext('testTrackId2', 'testInputDeviceId'),
          ],
        },
      }
      const state = {
        [action.payload.recordingContexts[0].overdub.id]: action.payload.recordingContexts[0].overdub,
        [action.payload.recordingContexts[1].overdub.id]: action.payload.recordingContexts[1].overdub,
      }

      expect(overdubs(state, action)).to.eql({})      
    })

    it('stores a midi event in an overdub on MIDI_EVENT_RECORDED given an overdubId and an event', () => {
      const action = {
        type: MIDI_EVENT_RECORDED,
        payload: {
          overdubId: 'teh-gr8est-overdub',
          event: newProcessedMidiEvent(),
        }
      }
      const state = {
        [action.payload.overdubId]: newOverdub(action.payload.overdubId),
      }

      expect(overdubs(state, action)).to.eql({
        [action.payload.overdubId]: {
          ...newOverdub(action.payload.overdubId),
          events: [action.payload.event],
        },
      })
    })
  })  
})
