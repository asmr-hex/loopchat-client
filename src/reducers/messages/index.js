import { combineReducers } from 'redux'
import { List } from 'immutable'
import { SEND_MESSAGE, RECEIVED_MESSAGE } from '../../actions/messages'

const sent = (state=List(), action) => {
  switch (action.type) {
  case SEND_MESSAGE:
    return state.push(action.payload.message)
  default:
    return state
  }
}

const received = (state=List(), action) => {
  switch (action.type) {
  case RECEIVED_MESSAGE:
    return state.push(action.payload.message)
  default:
    return state
  }
}

export const messages = combineReducers({
  sent,
  received,
})
