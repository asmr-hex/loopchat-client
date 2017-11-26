import {CUSTOM_INSTRUMENTS_LOADED} from '../../actions/instruments'


export const custom = (state=[], action) => {
  switch(action.type) {
  case CUSTOM_INSTRUMENTS_LOADED:
    return action.payload
  default:
    return state
  }
}
