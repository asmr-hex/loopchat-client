import {get} from 'lodash'


export const getInstruments = state =>
  get(state, `instruments.byId`, {})

export const getOpenInstruments = state =>
  get(state, `instruments.open`, [])

export const getInstrument = (state, instrumentId) =>
  get(getInstruments(state), `${instrumentId}`)
