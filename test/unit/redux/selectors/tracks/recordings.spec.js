import { expect } from 'chai'
import {getDefaultState} from '../../../../support/state'
import {newMidiTrack} from '../../../../../src/types/track'
import {newRecording, newOverdub} from '../../../../../src/types/recording'
import {
  getMidiMasterRecordingFromTrack,
  getMidiInProgressRecordingsFromTrack,
} from '../../../../../src/redux/selectors/tracks/recordings'


describe('tracks recordings selectors', () => {

  const sampleMidiOverdubs = [newOverdub(), newOverdub(), newOverdub()]
  const sampleMidiRecording = newRecording()
  const sampleTrack = newMidiTrack('myTestTrackId', {recordingId: sampleMidiRecording.id})
  
  const state = getDefaultState({
    tracks: {
      midi: {
        [sampleTrack.id]: sampleTrack,
      },
    },
    recordings: {
      midi: {
        masters: {
          [sampleMidiRecording.id]: {
            ...sampleMidiRecording,
            overdubs: {
              [sampleMidiOverdubs[0].id]: true,
              [sampleMidiOverdubs[1].id]: true,
            },
          },
        },
        overdubs: {
          [sampleMidiOverdubs[0].id]: sampleMidiOverdubs[0],
          [sampleMidiOverdubs[1].id]: sampleMidiOverdubs[1],
          [sampleMidiOverdubs[2].id]: sampleMidiOverdubs[2], // irrelevant to sampleTrack
        },
      },
    },
  })
  
  describe('#getMidiMasterRecordingFromTrack', () => {

    it('gets the master recording sequence from a track recording', () => {
      expect(getMidiMasterRecordingFromTrack(state, sampleTrack.id)).eql(sampleMidiRecording.master)
    })

    it('returns an empty array if the track or recording doesn\'t exist', () => {
      expect(getMidiMasterRecordingFromTrack(state, 'fakeTrackId')).eql([])
    })
  })

  describe('#getMidiInProgressRecordingsFromTrack', () => {

    it('returns a map of in-progress overdubs for a given track', () => {
      expect(getMidiInProgressRecordingsFromTrack(state, sampleTrack.id)).eql({
        [sampleMidiOverdubs[0].id]: sampleMidiOverdubs[0],
        [sampleMidiOverdubs[1].id]: sampleMidiOverdubs[1],        
      })
    })
  })
})
