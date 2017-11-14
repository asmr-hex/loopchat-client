import {
  INSTRUMENT_WORKSTATION,
  EDITOR_WORKSTATION,
} from '../../../types/workstation'


export const WORKSTATION_UPDATED = 'WORKSTATION_UPDATED'

export const updateWorkstation = (workstation, params = {}) => dispatch =>
  dispatch({
    type: WORKSTATION_UPDATED,
    payload: {
      workstation,
      params,
    }
  })

export const openInstrumentWorkstation = instrumentId => dispatch =>
  dispatch(updateWorkstation(INSTRUMENT_WORKSTATION, {instrumentId}))

export const openEditorWorkstation = timelineId => dispatch =>
  dispatch(updateWorkstation(EDITOR_WORKSTATION, {timelineId}))
