import {INSTRUMENT_CREATED} from '../../actions/instruments'
import {INSTRUMENT_OPENED_IN_WORKSHOP} from '../../actions/ui/instruments'


export const open = (state = [], action) => {
  switch(action.type) {
  case INSTRUMENT_CREATED:
  case INSTRUMENT_OPENED_IN_WORKSHOP:
    return [action.payload.instrumentId]  // NOTE (cw|11.15.2017) eventually allow multiple open instruments?
  default:
    return state
  }
}
