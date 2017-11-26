import {expect} from 'chai'
import {newTimeline} from '../../../../../src/types/timeline'
import {
  TIMELINE_CREATED,
  TIMELINE_DELETED,
  TRACK_ADDED_TO_TIMELINE,
  TIMELINE_RECORDING_STATUS_UPDATED,
  TIMELINE_PLAYBACK_STARTED,
  TIMELINE_PLAYBACK_STOPPED,
  TIMELINE_SCRUBBER_POSITION_UPDATED,
} from '../../../../../src/redux/actions/timelines/timelines'
import {byId} from '../../../../../src/redux/reducers/timelines/byId'


describe('timelines reducer', () => {

  describe('byId subreducer', () => {

    it('adds a new timeline on TIMELINE_CREATED given an id', () => {
      const action = {type: TIMELINE_CREATED, payload: {timelineId: 'slow-decline'}}
      const state = {}

      expect(byId(state, action)).to.eql({
        [action.payload.timelineId]: newTimeline(action.payload.timelineId)
      })
    })

    it('removes a timeline on TIMELINE_DELETED given an id', () => {
      const action = {type: TIMELINE_DELETED, payload: {timelineId: 'borderlands'}}
      const state = {
        [action.payload.timelineId]: newTimeline(action.payload.timelineId)
      }

      expect(byId(state, action)).to.eql({})      
    })

    it('adds a trackId to a timeline on TRACK_ADDED_TO_TIMELINE given a trackId and timelineId', () => {
      const action = {
        type: TRACK_ADDED_TO_TIMELINE,
        payload: {
          timelineId: 'learning-2-<3-2-h8-urself',
          trackId: ';__;',
        },
      }
      const state = {
        [action.payload.timelineId]: newTimeline(action.payload.timelineId)
      }

      expect(byId(state, action)).to.eql({
        [action.payload.timelineId]: newTimeline(
          action.payload.timelineId,
          {
            tracks: [action.payload.trackId],
          },
        ),
      })
    })

    it('updates the recording status of a timeline on TIMELINE_RECORDING_STATUS_UPDATED', () => {
      const action = {
        type: TIMELINE_RECORDING_STATUS_UPDATED,
        payload: {
          timelineId: 'so-long,farwell',
          inProgress: true,
        },
      }
      const state = {
        [action.payload.timelineId]: newTimeline(action.payload.timelineId),
      }

      expect(byId(state, action)).to.eql({
        [action.payload.timelineId]: newTimeline(
          action.payload.timelineId,
          {
            recording: true,
          },
        )
      })
    })

    it('updates the playback status of a timeline to true on TIMELINE_PLAYBACK_STARTED', () => {
      const action = {type: TIMELINE_PLAYBACK_STARTED, payload: {timelineId: 'mutant-millenial'}}
      const state = {
        [action.payload.timelineId]: newTimeline(action.payload.timelineId),
      }

      expect(byId(state, action)).to.eql({
        [action.payload.timelineId]: newTimeline(
          action.payload.timelineId,
          {
            playing: true,
          },
        )        
      })
    })

    it('updates the playback status of a timeline to false on TIMELINE_PLAYBACK_STOPPED', () => {
      const action = {type: TIMELINE_PLAYBACK_STOPPED, payload: {timelineId: 'brilliant-mutant'}}
      const state = {
        [action.payload.timelineId]: newTimeline(
          action.payload.timelineId,
          {
            playing: true,
          },
        ),
      }

      expect(byId(state, action)).to.eql({
        [action.payload.timelineId]: newTimeline(
          action.payload.timelineId,
          {
            playing: false,
          },
        )
      })
    })

    it('updates the scrubber time position on TIMELINE_SCRUBBER_POSITION_UPDATED', () => {
      const action = {
        type: TIMELINE_SCRUBBER_POSITION_UPDATED,
        payload: {
          timelineId: 'i-see-myself-in-the-void-of-the-quarry',
          time: 666.66,
        },
      }
      const state = {
        [action.payload.timelineId]: newTimeline(action.payload.timelineId),
      }

      expect(byId(state, action)).to.eql({
        [action.payload.timelineId]: newTimeline(
          action.payload.timelineId,
          {
            scrubberTime: action.payload.time,
          },
        )        
      })
    })
  })
})
