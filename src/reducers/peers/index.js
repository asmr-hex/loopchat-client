import { List } from 'immutable'
import { JOINED_BY_PEERS } from '../../actions/peers'

export const peers = (state=List(), action) => {
  switch(action.type) {
  case JOINED_BY_PEERS:
    return List(action.payload.peers)
  default:
    return state
  }
}
