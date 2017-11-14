import {get, omit} from 'lodash'
import {newTimeline} from '../../../types/timeline'
import {
  TIMELINE_CREATED,
  TIMELINE_CREATED_BY_PEER,
  TIMELINE_DELETED,
  TIMELINE_DELETED_BY_PEER,
  TRACK_ADDED_TO_TIMELINE,
  TRACK_ADDED_TO_TIMELINE_BY_PEER,
  TIMELINE_RECORDING_STATUS_UPDATED,
  TIMELINE_PLAYBACK_STARTED,
  TIMELINE_PLAYBACK_STOPPED,
  TIMELINE_SCRUBBER_POSITION_UPDATED,
} from '../../actions/timelines/timelines'


export const byId = (state = {}, action) => {
  switch (action.type) {
  case TIMELINE_CREATED_BY_PEER:
  case TIMELINE_CREATED:
    return createNewTimeline(state, action.payload.timelineId)
  case TIMELINE_DELETED_BY_PEER:
  case TIMELINE_DELETED:
    return deleteTimeline(state, action.payload.timelineId)
  case TRACK_ADDED_TO_TIMELINE_BY_PEER:
  case TRACK_ADDED_TO_TIMELINE:
    return addTrackToTimeline(state, action.payload.timelineId, action.payload.trackId)
  // case TRACK_REMOVED_FROM_TIMELINE:
  // case TIMELINE_TEMPO_UPDATED:
    // case TIMELINE_TIME_SIGNATURE_UPDATED:
  case TIMELINE_RECORDING_STATUS_UPDATED:
    return updateRecordingStatusOf(state, action.payload.timelineId, action.payload.inProgress)
  case TIMELINE_PLAYBACK_STARTED:
    return updatePlaybackStatusOf(state, action.payload.timelineId, true)
  case TIMELINE_PLAYBACK_STOPPED:
    return updatePlaybackStatusOf(state, action.payload.timelineId, false)
  // case TIMELINE_SELECTION_ADDED:
  // case TIMELINE_SELECTION_UPDATED:
  // case TIMELINE_SELECTION_DELETED:
  // case TIMELINE_LOOP_TYPE_UPDATED:
  case TIMELINE_SCRUBBER_POSITION_UPDATED:
    return updateScrubberPosition(state, action.payload.timelineId, action.payload.time)
  default:
    return state
  }
}

/**
 * createNewTimeline adds a new timeline to state.
 *
 * @param state :: {}
 * @param id "" string
 */
export const createNewTimeline = (state, id) => ({
  ...state,
  [id]: newTimeline(id),
})

/**
 * deleteNewTimeline removes a timeline from the state. 
 *
 * @param state :: {}
 * @param id :: string
 */
export const deleteTimeline = (state, id) => omit(state, id)

/**
 * addTrackToTimeline adds the id of a track to the timeline. Note that by default
 * tracks are appended to the end of the array of track ids. 
 *
 * @param state :: {}
 * @param timelineId :: string
 * @param trackId :: string
 */
export const addTrackToTimeline = (state, timelineId, trackId) => ({
  ...state,
  [timelineId]: {
    ...get(state, timelineId, {}),
    tracks: [...get(state, `${timelineId}.tracks`), trackId],
  },
})

/**
 * updateRecordingStatusOf updates whether the timeline is recording or not. 
 *
 * @param state :: {}
 * @param timelineId :: string
 * @param inProgress : bool
 */
export const updateRecordingStatusOf = (state, timelineId, inProgress) => ({
  ...state,
  [timelineId]: {...get(state, timelineId), recording: inProgress}
})

/**
 * updatePlaybackStatusOf takes a timelineId and a boolean indicating the playback
 * status and sets the state of a timeline to playing or stopped.
 *
 * @param timelineId :: string
 * @param playing :: bool
 */
export const updatePlaybackStatusOf = (state, timelineId, playing) => ({
  ...state,
  [timelineId]: {...get(state, timelineId), playing},
})

/**
 * updateScrubberPosition takes a timelineId and a time and updates the time position
 * of the timeline scrubber. 
 *
 * @param state :: {}
 * @param timelineId :: string
 * @param time :: float
 */
export const updateScrubberPosition = (state, timelineId, time) => ({
  ...state,
  [timelineId]: {
    ...get(state, timelineId),
    scrubberTime: time,
  },  
})
