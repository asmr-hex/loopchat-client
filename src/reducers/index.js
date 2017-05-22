import { combineReducers } from 'redux'
import { connection } from './connection'
import { messages } from './messages'
import { session } from './session'
import { midiDevices } from './midiDevices'
import { peers } from './peers'

const reducers = combineReducers({
  connection,
  messages,
  session,  
  midiDevices,
  peers,
})

export default reducers
