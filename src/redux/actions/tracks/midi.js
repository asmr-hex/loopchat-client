import uuidV4 from 'uuid/v4'
import {activateMidiInputDevice, deactivateMidiInputDevice} from '../midi'
import {createNewMidiRecording} from '../recordings/midi/midi'


export const MIDI_TRACK_CREATED = 'MIDI_TRACK_CREATED'
export const MIDI_TRACK_CREATED_BY_PEER = 'MIDI_TRACK_CREATED_BY_PEER'
export const createMidiTrack = (trackId = uuidV4(), recordingId = uuidV4()) => dispatch => {
  // by default we create a new recording object for this midi track
  dispatch(createNewMidiRecording(recordingId))
  
  // create a new midi track
  dispatch({
    type: MIDI_TRACK_CREATED,
    payload: {
      trackId,
      recordingId,
    },
  })
}

export const MIDI_TRACK_DELETED = 'MIDI_TRACK_DELETED'
export const MIDI_TRACK_DELETED_BY_PEER = 'MIDI_TRACK_DELETED_BY_PEER'
export const deleteMidiTrack = trackId => dispatch =>
  dispatch({
    type: MIDI_TRACK_DELETED,
    payload: {trackId},
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
