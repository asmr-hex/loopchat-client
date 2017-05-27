import { omit, get, isUndefined } from 'lodash'
import {REGISTERED_MIDI_INPUT_DEVICE, UNREGISTERED_MIDI_INPUT_DEVICE} from '../../../actions/midi/input/input'
import {ACTIVATE_MIDI_INPUT_DEVICE, DEACTIVATE_MIDI_INPUT_DEVICE} from '../../../actions/midi/index'

export const input = (state = {}, action) => {
  switch (action.type) {
  case REGISTERED_MIDI_INPUT_DEVICE:
    return { ...state, [action.payload.id]: action.payload }
  case UNREGISTERED_MIDI_INPUT_DEVICE:
    return omit(state, action.payload.id)
  case ACTIVATE_MIDI_INPUT_DEVICE:
    return setMidiDeviceActivationState(state, action.payload, true)
  case DEACTIVATE_MIDI_INPUT_DEVICE:
    return setMidiDeviceActivationState(state, action.payload, false)
  default:
    return state
  }
}

export const setMidiDeviceActivationState = (state, deviceId, activated) => {
  const device = get(state, deviceId)

  // ensure this device has been registered already
  if (isUndefined(device)) return state

  return { ...state, [deviceId]: { ...device, activated } }
}

