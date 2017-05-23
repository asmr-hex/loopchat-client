import { JOINED_SESSION } from '../../actions/session/index'

export const session = (state={}, action) => {
  switch(action.type) {
  case JOINED_SESSION:
    return action.payload
  default:
    return state
  }
}
