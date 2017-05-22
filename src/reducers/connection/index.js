import { combineReducers } from  'redux'
import { connectionStatus } from '../../types/connectionStatus'
import { CONNECTING, CONNECTED, DISCONNECTED } from '../../actions/connection/status'

export const status = (state = connectionStatus.DISCONNECTED, action) => {
  switch (action.type) {
  case CONNECTING:
    return connectionStatus.CONNECTING
  case CONNECTED:
    return connectionStatus.CONNECTED
  case DISCONNECTED:
    return connectionStatus.DISCONNECTED
  default:
    return state
  }
}

export const connection = combineReducers({
  status,
})
