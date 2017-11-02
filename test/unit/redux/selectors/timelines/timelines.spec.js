import { expect } from 'chai'
import {map} from 'lodash'
import {getDefaultState} from '../../../../support/state'
import {newMidiTrack} from '../../../../../src/types/track'
import {newRecording} from '../../../../../src/types/recording'
import {newTimeline} from '../../../../../src/types/timeline'
import {
  getTimelineProperty,
  getTracksFromTimeline,
  getActiveTracksFromTimeline,
  getUnmutedMasterRecordingsFromTimeline,
} from '../../../../../src/redux/selectors/timelines'


describe('timeline selectors', () => {

  const sampleMidiRecordings = [newRecording(), newRecording(), newRecording(), newRecording()]
  const sampleTracks = [
    newMidiTrack('track0Id', {activated: false, recordingId: sampleMidiRecordings[0].id, mute: false}),
    newMidiTrack('track1Id', {activated: true, recordingId: sampleMidiRecordings[1].id, mute: true}),
    newMidiTrack('track2Id', {activated: false, recordingId: sampleMidiRecordings[2].id, mute: false}),
    newMidiTrack('track3Id', {activated: true, recordingId: sampleMidiRecordings[3].id, mute: false}),
  ]
  const sampleTimeline = newTimeline('myTestTimelineId', {tracks: map(sampleTracks, trk => trk.id)})
  const sampleTimelineNoTracks = newTimeline()
  
  const state = getDefaultState({
    timelines: {
      [sampleTimeline.id]: sampleTimeline,
      [sampleTimelineNoTracks.id]: sampleTimelineNoTracks,
    },
    tracks: {
      midi: {
        [sampleTracks[0].id]: sampleTracks[0],
        [sampleTracks[1].id]: sampleTracks[1],
        [sampleTracks[2].id]: sampleTracks[2],
        [sampleTracks[3].id]: sampleTracks[3],
      },
    },
    recordings: {
      midi: {
        masters: {
          [sampleMidiRecordings[0].id]: sampleMidiRecordings[0],
          [sampleMidiRecordings[1].id]: sampleMidiRecordings[1],
          [sampleMidiRecordings[2].id]: sampleMidiRecordings[2],
          [sampleMidiRecordings[3].id]: sampleMidiRecordings[3],
        },
      },
    },
  })
  
  describe('#getTimelineProperty', () => {

    it('returns the value of a top level property within a timeline', () => {
      expect(getTimelineProperty(state, sampleTimeline.id, 'tracks')).eql(
        map(sampleTracks, trk => trk.id),
      )
    })

    it('returns "undefined" if the property queried does not exist', () => {
      expect(getTimelineProperty(state, sampleTimeline.id, 'nonexistence')).to.be.undefined
    })
  })

  describe('#getTracksFromTimeline', () => {

    it('returns an array of tracks belonging to a timeline', () => {
      expect(getTracksFromTimeline(state, sampleTimeline.id)).to.eql(sampleTracks)
    })

    it('returns an empty array when no tracks belong to a timeline', () => {
      expect(getTracksFromTimeline(state, sampleTimelineNoTracks.id)).to.eql([])
    })
  })

  describe('#getActiveTracksFromTimeline', () => {

    it('returns an array of active tracks belonging to a timeline', () => {
      expect(getActiveTracksFromTimeline(state, sampleTimeline.id)).to.eql([
        sampleTracks[1],
        sampleTracks[3],
      ])
    })
  })

  describe('#getUnmutedMasterRecordingsFromTimeline', () => {

    it('returns an array of unmuted midi master recordings within a timeline', () => {
      expect(getUnmutedMasterRecordingsFromTimeline(state, sampleTimeline.id)).to.eql([
        sampleMidiRecordings[0].master,
        sampleMidiRecordings[2].master,
        sampleMidiRecordings[3].master,
      ])
    })
  })
})
