import {newInstrument} from '../../../types/instrument'
import {INSTRUMENT_CREATED} from '../../actions/instruments'


export const byId = (state = {}, action) => {
  switch(action.type) {
  case INSTRUMENT_CREATED:
    return {...state, [action.payload.instrumentId]: newInstrument(action.payload.instrumentId)} // TODO (cw|11.15.2017) eventually move the instrument constructor to the action...
  default:
    return state
  }
}
