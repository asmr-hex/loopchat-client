import { combineReducers } from 'redux'
import { SEND_MESSAGE, RECEIVED_MESSAGE } from '../../actions/messages'

export const sent = (state = [], action) => {
  switch (action.type) {
  case SEND_MESSAGE:
    return [...state, action.payload]
  default:
    return state
  }
}

export const received = (state=[], action) => {
  switch (action.type) {
  case RECEIVED_MESSAGE:
    return [...state, action.payload]
  default:
    return state
  }
}

export const messages = combineReducers({
  sent,
  received,
})
