import { combineReducers } from  'redux'
import { connectionStatus } from '../../types/connectionStatus'
import { CONNECTING, CONNECTED, DISCONNECTED } from '../../actions/connection/status'


// function connected(state=false, action) {
//   switch(action.type) {
//   case actions.CONNECTED:
//     return true
//   case actions.DISCONNECTED:
//     return false
//   default:
//     return state
//   }
// }

// function connecting(state=false, action) {
//   switch(action.type) {
//   case actions.CONNECTING:
//     return true
//   case actions.CONNECTED:
//   case actions.DISCONNECTED:
//     return false
//   default:
//     return state
//   }
// }

const status = (state = connectionStatus.DISCONNECTED, action) => {
  switch (action.type) {
  case CONNECTING:
    return connectionStatus.CONNECTING
  case CONNECTED:
    return connectionStatus.CONNECTED
  case DISCONNECTED:
    return connectionSTatus.DISCONNECTED
  default:
    return state
  }
}

export const connection = combineReducers({
  status,
})
