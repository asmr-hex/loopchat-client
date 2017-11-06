import { expect } from 'chai'
import {getDefaultState} from '../../../../support/state'
import {newMidiTrack} from '../../../../../src/types/track'
import {newRecording, newOverdub} from '../../../../../src/types/recording'
import {
  getMidiRecordingFromTrack,
  getMidiMasterRecordingFromTrack,
  getMidiInProgressOverdubsFromTrack,
  getUserMidiOverdubFromTrack,
} from '../../../../../src/redux/selectors/tracks/recordings'


describe('tracks recordings selectors', () => {

  const userId = 'Dr. Temporary' // TODO (cw|11.2.2017) change this once build out user data
  const sampleMidiOverdubs = [{...newOverdub(), creator: 'destroyer'}, newOverdub(), newOverdub()]
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

  describe('#getMidiRecordingFromTrack', () => {
    it('gets a midi recording object associated with a track', () => {
      expect(getMidiRecordingFromTrack(state, sampleTrack.id)).to.eql({
        ...sampleMidiRecording,
        overdubs: {
          [sampleMidiOverdubs[0].id]: true,
          [sampleMidiOverdubs[1].id]: true,          
        }
      })
    })
  })
  
  describe('#getMidiMasterRecordingFromTrack', () => {

    it('gets the master recording sequence from a track recording', () => {
      expect(getMidiMasterRecordingFromTrack(state, sampleTrack.id)).eql(sampleMidiRecording.master)
    })
  })

  describe('#getMidiInProgressOverdubsFromTrack', () => {

    it('returns a map of in-progress overdubs for a given track', () => {
      expect(getMidiInProgressOverdubsFromTrack(state, sampleTrack.id)).eql({
        [sampleMidiOverdubs[0].id]: sampleMidiOverdubs[0],
        [sampleMidiOverdubs[1].id]: sampleMidiOverdubs[1],        
      })
    })
  })

  describe('#getUserMidiOverdubFromTrack', () => {

    it('returns an overdub for the specified track and user', () => {
      expect(getUserMidiOverdubFromTrack(state, sampleTrack.id, userId)).eql(sampleMidiOverdubs[1])
    })
  })
})
