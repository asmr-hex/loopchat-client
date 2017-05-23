import { omit } from 'lodash'
import { REGISTERED_MIDI_DEVICE, UNREGISTERED_MIDI_DEVICE } from '../../actions/midiDevices/index'

export const midiDevices = (state = {}, action) => {
  switch (action.type) {
  case REGISTERED_MIDI_DEVICE:
    return { ...state, [action.payload.id]: action.payload }
  case UNREGISTERED_MIDI_DEVICE:
    return omit(state, action.payload.id)
  default:
    return state
  }
}
