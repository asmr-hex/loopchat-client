import { combineReducers } from 'redux'
import { List, Map } from  'immutable'
import * as actions from '../actions'


function connected(state=false, action) {
  switch(action.type) {
  case actions.CONNECTED:
    return true
  case actions.DISCONNECTED:
    return false
  default:
    return state
  }
}

function connecting(state=false, action) {
  switch(action.type) {
  case actions.CONNECTING:
    return true
  case actions.CONNECTED:
  case actions.DISCONNECTED:
    return false
  default:
    return state
  }
}

function sentMessages(state=List(), action) {
  switch(action.type) {
  case actions.SEND_MESSAGE:
    return state.push(action.message)
  default:
    return state
  }
}

function receivedMessages(state=List(), action) {
  switch(action.type) {
  case actions.RECEIVED_MESSAGE:
    return state.push(action.message)
  default:
    return state
  }
}

function session(state=Map(), action) {
  switch(action.type) {
  case actions.JOINED_SESSION:
    return Map(action.session)
  default:
    return state
  }
}


const reducers = combineReducers({
  connected,
  connecting,
  sentMessages,
  receivedMessages,
  session
})

export default reducers
