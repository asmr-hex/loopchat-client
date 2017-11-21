import {reduce} from 'lodash'
import {newInstrument} from '../../../types/instrument'
import {
  INSTRUMENT_CREATED,
  PREFAB_INSTRUMENTS_LOADED,
  CUSTOM_INSTRUMENTS_LOADED,
} from '../../actions/instruments'


export const byId = (state = {}, action) => {
  switch(action.type) {
  case INSTRUMENT_CREATED:
    return {...state, [action.payload.instrumentId]: newInstrument(action.payload.instrumentId)} // TODO (cw|11.15.2017) eventually move the instrument constructor to the action...
  case PREFAB_INSTRUMENTS_LOADED:
  case CUSTOM_INSTRUMENTS_LOADED:
    return mergeInstruments(action.payload)
  default:
    return state
  }
}

export const mergeInstruments = (state, instruments) =>
  reduce(
    instruments,
    (acc, instrument) => ({...acc, [instrument.id]: instrument}),
    state,
  )
