import {PREFAB_INSTRUMENTS_LOADED} from '../../actions/instruments'


export const prefabs = (state=[], action) => {
  switch(action.type) {
  case PREFAB_INSTRUMENTS_LOADED:
    return action.payload
  default:
    return state
  }
}
