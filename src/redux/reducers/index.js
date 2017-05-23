import { combineReducers } from 'redux'
import { connection } from './connection/index'
import { messages } from './messages/index'
import { session } from './session/index'
import { midiDevices } from './midiDevices/index'
import { peers } from './peers/index'

const reducers = combineReducers({
  connection,
  messages,
  session,  
  midiDevices,
  peers,
})

export default reducers
