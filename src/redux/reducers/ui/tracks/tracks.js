import {combineReducers} from 'redux'
import {midi} from './midi'
import {audio} from './audio'


export const tracks = combineReducers({
  midi,
  audio,
})
