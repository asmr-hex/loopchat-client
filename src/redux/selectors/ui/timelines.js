import {get} from 'lodash'


/**
 * gets the ui property for a given timeline. 
 * @param {Object} state - full Redux state tree
 * @param {string} timelineId - id of the timeline we want to get the ui property for.
 * @returns {*} - the value of the ui property we queried.
 */
export const getTimelineUIProperty = (state, timelineId, property) =>
  get(state, `ui.timelines.${timelineId}.${property}`)
