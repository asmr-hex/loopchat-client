import { combineReducers } from 'redux'
import { connection } from './connection/index'
import { messages } from './messages/index'
import { session } from './session/index'
import { midi } from './midi/index'
import { peers } from './peers/index'
import {recordings} from './recordings/index'

const reducers = combineReducers({
  connection,
  messages,
  session,  
  midi,
  peers,
  recordings,
})

export default reducers
