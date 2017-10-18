import { combineReducers } from 'redux'
import { connection } from './connection/index'
import { messages } from './messages/index'
import { session } from './session/index'
import { midi } from './midi/index'
import { peers } from './peers/index'
import {recordings} from './recordings/index'
import {timelines} from './timelines/timelines'
import {tracks} from './tracks/tracks'
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
