import uuidV4 from 'uuid/v4'
import {openInstrumentWorkstation} from '../workstations'


export const INSTRUMENT_CREATED = 'INSTRUMENT_CREATED'

export const buildNewInstrument = (instrumentId = uuidV4()) => dispatch => {
  dispatch({
    type: INSTRUMENT_CREATED,
    payload: {
      instrumentId,
    }
  })

  dispatch(openInstrumentWorkstation(instrumentId))
}

