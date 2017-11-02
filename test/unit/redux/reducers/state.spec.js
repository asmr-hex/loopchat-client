import { expect } from 'chai'
import {getDefaultState} from '../../../support/state'
import reducer from '../../../../src/redux/reducers'


describe('redux state tree', () => {

  const sampleDefaultState = getDefaultState()

  // create a default state by propagating an undefined state and a nop action
  // through the reducer tree.
  const defaultState = reducer(undefined, {type: 'NOP'})
  
  it('has a default state', () => {
    expect(defaultState).eql(sampleDefaultState)
  })
})
