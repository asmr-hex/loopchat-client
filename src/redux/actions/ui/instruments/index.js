export const INSTRUMENT_OPENED_IN_WORKSHOP = 'INSTRUMENT_OPENED_IN_WORKSHOP'

export const openInstrumentInWorkshop = instrumentId => dispatch =>
  dispatch({
    type: INSTRUMENT_OPENED_IN_WORKSHOP,
    payload: {
      instrumentId,
    },
  })
