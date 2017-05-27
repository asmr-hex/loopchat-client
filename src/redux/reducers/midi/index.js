import {combineReducers} from 'redux'
import {input} from './input/input'
import {output} from './output/output'

export const midi = combineReducers({
  input,
  output,
})