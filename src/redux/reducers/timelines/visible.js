import {TIMELINE_CREATED} from '../../actions/timelines/timelines'
import {TIMELINE_OPENED_IN_EDITOR} from '../../actions/ui/timelines'


export const visible = (state=[], action) => {
  switch (action.type) {
  case TIMELINE_CREATED:
  case TIMELINE_OPENED_IN_EDITOR:
    return [action.payload.timelineId]  // NOTE (cw|11.14.2017) maybe one day we can have multiple timelines visible...
  default:
    return state
  }
}
