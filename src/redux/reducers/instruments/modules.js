import {INSTRUMENT_MODULES_LOADED} from '../../actions/instruments'


export const modules = (state=[], action) => {
  switch(action.type) {
  case INSTRUMENT_MODULES_LOADED:
    return action.payload
  default:
    return state
  }
}
