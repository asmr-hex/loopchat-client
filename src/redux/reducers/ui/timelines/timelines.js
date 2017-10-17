import {TIMELINE_CREATED} from '../../../actions/timelines/timelines'
import {newTimelineUI} from '../../../../types/timeline'


export const timelines = (state = {}, action) => {
  switch (action.type) {
  case TIMELINE_CREATED:
    return makeTimelineUI(state, action.payload.id)
  // case TIMELINE_VISIBILITY_UPDATED:
  // case TIMELINE_RESIZED:
  // case TIMELINE_RESCALED:
  default:
    return state
  }
}

export const makeTimelineUI = (state, id) => {
  return {
    ...state,
    [id]: newTimelineUI(), // TODO (cw|10.17.2017) eventually be able to pass a user defined config here.
  }
}
