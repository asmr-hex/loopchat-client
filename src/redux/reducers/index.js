import { combineReducers } from 'redux'
import { connection } from './connection'
import { messages } from './messages'
import { session } from './session'
import { midi } from './midi'
import { peers } from './peers'
import {recordings} from './recordings'
import {timelines} from './timelines'
import {tracks} from './tracks'
import {ui} from './ui'


const reducers = combineReducers({
  connection,
  messages,
  session,  
  midi,
  peers,
  timelines,
  tracks,
  recordings,
  ui,
})

export default reducers
