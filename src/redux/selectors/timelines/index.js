import {get, map} from 'lodash'


/**
 * getTimeline returns a timeline property from the redux store .
 *
 * @param state :: {}
 * @param timelineId :: string
 */
export const getTimelineProperty = (state, timelineId, property) =>
  get(state, `timelines.${timelineId}.${property}`)

/**
 * getTracksFromTimeline returns an array of track objects which are members
 * of the given timeline. 
 *
 * @param state :: {}
 * @param timelineId :: string
 */
export const getTracksFromTimeline = (state, timelineId) =>
  map(
    get(state, `timelines.${timelineId}.tracks`, []),
    trackId => get(state, `tracks.midi.${trackId}`), // TODO (cw|10.24.2017) we should rename this selector.
  )
