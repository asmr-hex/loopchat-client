import uuidV4 from 'uuid/v4'
import {createMidiTrack} from '../tracks/midi'


export const TIMELINE_CREATED = 'TIMELINE_CREATED'
export const TIMELINE_DELETED = 'TIMELINE_DELETED'
export const TRACK_ADDED_TO_TIMELINE = 'TRACK_ADDED_TO_TIMELINE'
export const TIMELINE_PLAYBACK_STARTED = 'TIMELINE_PLAYBACK_STARTED'
export const TIMELINE_PLAYBACK_STOPPED = 'TIMELINE_PLAYBACK_STOPPED'
export const TIMELINE_SCRUBBER_POSITION_UPDATED = 'TIMELINE_SCRUBBER_POSITION_UPDATED'

export const createTimeline = timelineId => dispatch =>
  dispatch({
    type: TIMELINE_CREATED,
    payload: {
      timelineId,
    },
  })

export const deleteTimeline = timelineId => dispatch =>
  dispatch({
    type: TIMELINE_DELETED,
    payload: {
      timelineId,
    },
  })

export const addTrackToTimeline = (trackId, timelineId) => dispatch =>
  dispatch({
    type: TRACK_ADDED_TO_TIMELINE,
    payload: {
      trackId,
      timelineId,
    },
  })

export const addNewTrackToTimeline = timelineId => dispatch => {
  const trackId = uuidV4()
  
  // create new midi track
  dispatch(createMidiTrack(trackId))

  // add this new track to timeline
  dispatch(addTrackToTimeline(trackId, timelineId))
}

export const startPlayback = timelineId => dispatch =>
  dispatch({
    type: TIMELINE_PLAYBACK_STARTED,
    payload: {
      timelineId,
    },
  })

export const stopPlayback = timelineId => dispatch =>
  dispatch({
    type: TIMELINE_PLAYBACK_STOPPED,
    payload: {
      timelineId,
    },
  })

export const updateScrubberPosition = (timelineId, time) => dispatch =>
  dispatch({
    type: TIMELINE_SCRUBBER_POSITION_UPDATED,
    payload: {
      timelineId,
      time,
    },
  })

