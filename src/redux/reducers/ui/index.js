import {combineReducers} from 'redux'
import {timelines} from './timelines/timelines'
import {tracks} from './tracks/tracks'


export const ui = combineReducers({
  timelines,
  tracks,
})
