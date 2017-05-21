import { Map } from 'immutable'
import { JOINED_SESSION } from '../../actions/session'

export const session = (state=Map(), action) => {
  switch(action.type) {
  case JOINED_SESSION:
    return Map(action.payload.session)
  default:
    return state
  }
}
