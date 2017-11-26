import {combineReducers} from 'redux'
import {open} from './open'
import {byId} from './byId'
import {modules} from './modules'
import {prefabs} from './prefabs'
import {custom} from './custom'


export const instruments = combineReducers({
  modules,
  prefabs,
  custom,
  byId,
  open,
})

