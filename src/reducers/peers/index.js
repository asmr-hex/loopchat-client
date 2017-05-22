import { JOINED_BY_PEERS } from '../../actions/peers'

export const peers = (state=[], action) => {
  switch(action.type) {
  case JOINED_BY_PEERS:
    return action.payload // an array of peers
  default:
    return state
  }
}
