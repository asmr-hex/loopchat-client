import { omit } from 'lodash'
import {
  REGISTERED_MIDI_OUTPUT_DEVICE,
  UNREGISTERED_MIDI_OUTPUT_DEVICE
} from '../../../actions/midi/output/output'

export const output = (state = {}, action) => {
  switch (action.type) {
  case REGISTERED_MIDI_OUTPUT_DEVICE:
    return { ...state, [action.payload.id]: action.payload }
  case UNREGISTERED_MIDI_OUTPUT_DEVICE:
    return omit(state, action.payload.id)
  default:
    return state
  }
}

