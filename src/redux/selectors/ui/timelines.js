import {get} from 'lodash'


/**
 * getTimelineUI returns the ui property for a given timeline. 
 *
 * @param state :: {}
 * @param timelineId :: string
 */
export const getTimelineUIProperty = (state, timelineId, property) =>
  get(state, `ui.timelines.${timelineId}.${property}`)
