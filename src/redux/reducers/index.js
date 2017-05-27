import { combineReducers } from 'redux'
import { connection } from './connection/index'
import { messages } from './messages/index'
import { session } from './session/index'
import { midi } from './midi/index'
import { peers } from './peers/index'

const reducers = combineReducers({
  connection,
  messages,
  session,  
  midi,
  peers,
})

export default reducers
