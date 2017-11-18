import uuidV4 from 'uuid/v4'
import {reduce} from 'lodash'
import {openInstrumentWorkspace} from '../workspaces'
import {openInstrumentInWorkshop} from '../ui/instruments'


export const INSTRUMENT_CREATED = 'INSTRUMENT_CREATED'

export const buildNewInstrument = (instrumentId = uuidV4()) => dispatch => {
  // create new instrument
  dispatch({
    type: INSTRUMENT_CREATED,
    payload: {
      instrumentId,
    }
  })

  // open instrument in workshop
  dispatch(openInstrumentInWorkshop(instrumentId))
  
  // open Instrument Workshop
  dispatch(openInstrumentWorkspace())
}

export const MODULES_LOADED = 'MODULES_LOADED'
export const PREFAB_INSTRUMENTS_LOADED = 'INSTRUMENTS_LOADED'
export const CUSTOM_INSTRUMENTS_LOADED = 'CUSTOM_INSTRUMENTS_LOADED'

export const loadInstruments = instrumentCollection => dispatch => {
  // load modules
  dispatch(loadModules(instrumentCollection.modules))

  // load prefabs
  dispatch(loadPrefabInstruments(instrumentCollection.prefabs))

  // load custom
  dispatch(loadCustomInstruments(instrumentCollection.custom))
}

export const loadModules = modules => dispatch =>
  dispatch({
    type: MODULES_LOADED,
    payload: reduce(
      modules,
      (acc, module) => ({...acc, [module.id]: {id: module.id, name: module.name}}),
      {},
    ),
  })

export const loadPrefabInstruments = prefabs => dispatch =>
  dispatch({
    type: PREFAB_INSTRUMENTS_LOADED,
    payload: reduce(
      prefabs,
      (acc, prefab) => ({...acc, [prefab.id]: {id: prefab.id, name: prefab.name}}),
      {},
    ),
  })

// NOTE (cw|11.17.2017) this will eventually be more complex since we will have
// to be able to dynamically instantiate an arbitrarily complex custom instrument
// configuration.
export const loadCustomInstruments = customs => dispatch =>
  dispatch({
    type: CUSTOM_INSTRUMENTS_LOADED,
    payload: reduce(
      customs,
      (acc, custom) => ({...acc, [custom.id]: {id: custom.id, name: custom.name}}),
      {},
    )
  })
