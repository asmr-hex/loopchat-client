import { combineReducers } from 'redux'
import { List, Map } from  'immutable'
import * as actions from '../actions'
import { map, omit } from 'lodash'

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

function peers(state=List(), action) {
  switch(action.type) {
  case actions.JOINED_BY_PEERS:
    return List(action.peers)
  default:
    return state
  }
}

// const midiDevices = (state = [], action) => {
//   switch (action.type) {
//   case actions.REGISTERED_MIDI_DEVICES:
//     return action.payload
//   case actions.MIDI_MSG_HANDLER_ASSIGNED_TO_DEVICE:
//     return map(state, device => {
//       if (device.id === action.deviceId) device.onmidimessage = action.msgHandler
//       return device
//     })
//   default:
//     return state
//   }
// }

const midiDevices = (state = {}, action) => {
  switch (action.type) {
  case actions.REGISTERED_MIDI_DEVICE:
      return { ...state, [action.payload.id]: action.payload }
  case actions.UNREGISTERED_MIDI_DEVICE:
      return omit(state, action.payload.id)
  default:
    return state
  }
}

// const midiDevices = combineReducers({
//   byId,
// })

const reducers = combineReducers({
  connected,
  connecting,
  sentMessages,
  receivedMessages,
  session,
  midiDevices,
  peers,
})

export default reducers







