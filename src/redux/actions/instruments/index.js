import uuidV4 from 'uuid/v4'
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

