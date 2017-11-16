

export const INSTRUMENT_WORKSPACE = 'INSTRUMENT_WORKSPACE'
export const EDITOR_WORKSPACE = 'EDITOR_WORKSPACE'
export const HOME_WORKSPACE = 'HOME_WORKSPACE'

export const newWorkspace = (type, params = {}) => ({
  type,
  ...type === INSTRUMENT_WORKSPACE
    ? newInstrumentWorkspace(params)
    : newEditorWorkspace(params)
})


export const newInstrumentWorkspace = ({instrumentId}) => ({
  instrumentId,
})

export const newEditorWorkspace = ({timelineId}) => ({
  timelineId,
})
