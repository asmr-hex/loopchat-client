import uuidV4 from 'uuid/v4'
import {activateMidiInputDevice, deactivateMidiInputDevice} from '../midi'


export const MIDI_TRACK_CREATED = 'MIDI_TRACK_CREATED'
export const createMidiTrack = (id = uuidV4()) => dispatch =>
  dispatch({
    type: MIDI_TRACK_CREATED,
    payload: {id},
  })

export const MIDI_TRACK_DELETED = 'MIDI_TRACK_DELETED'
export const deleteMidiTrack = id => dispatch =>
  dispatch({
    type: MIDI_TRACK_DELETED,
    payload: {id},
  })

export const MIDI_TRACK_INPUT_DEVICE_ASSIGNED = 'MIDI_TRACK_INPUT_DEVICE_ASSIGNED'
export const assignInputDeviceToMidiTrack = (trackId, deviceId) => dispatch =>
  dispatch({
    type: MIDI_TRACK_INPUT_DEVICE_ASSIGNED,
    payload: {
      trackId,
      deviceId,
    }
  })

export const MIDI_TRACK_ACTIVATED = 'MIDI_TRACK_ACTIVATED'
export const activateMidiTrack = (trackId, deviceId) => dispatch => {
  // update the midi track within the state tree
  dispatch({
    type: MIDI_TRACK_ACTIVATED,
    payload: {
      trackId,
    }
  })

  // update the midi input device within the state tree
  dispatch(activateMidiInputDevice(deviceId))
}

export const MIDI_TRACK_DEACTIVATED = 'MIDI_TRACK_DEACTIVATED'
export const deactivateMidiTrack = (trackId, deviceId) => dispatch => {
  // update the midi track within the state tree
  dispatch({
    type: MIDI_TRACK_DEACTIVATED,
    payload: {
      trackId,
    }
  })

  // update the midi input device within the state tree
  dispatch(deactivateMidiInputDevice(deviceId))
}
