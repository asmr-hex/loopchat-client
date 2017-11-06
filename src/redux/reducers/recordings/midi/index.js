import {combineReducers} from 'redux'
import {masters} from './masters'
import {overdubs} from './overdubs'


export const midi = combineReducers({
  overdubs,
  masters,
})
