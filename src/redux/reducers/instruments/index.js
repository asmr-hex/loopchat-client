import {combineReducers} from 'redux'
import {open} from './open'
import {byId} from './byId'


export const instruments = combineReducers({
  byId,
  open,
})

