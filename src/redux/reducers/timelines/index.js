import {combineReducers} from 'redux'
import {byId} from './byId'
import {visible} from './visible'


export const timelines = combineReducers({
  byId,
  visible,
})
