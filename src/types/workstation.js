

export const INSTRUMENT_WORKSTATION = 'INSTRUMENT_WORKSTATION'
export const EDITOR_WORKSTATION = 'EDITOR_WORKSTATION'

export const newWorkstation = (type, params = {}) => ({
  type,
  ...type === INSTRUMENT_WORKSTATION
    ? newInstrumentWorkstation(params)
    : newEditorWorkstation(params)
})


export const newInstrumentWorkstation = ({instrumentId}) => ({
  instrumentId,
})

export const newEditorWorkstation = ({timelineId}) => ({
  timelineId,
})
