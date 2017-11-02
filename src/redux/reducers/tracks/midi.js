import {get, omit} from 'lodash'
import {newMidiTrack} from '../../../types/track'
import {
  MIDI_TRACK_CREATED,
  MIDI_TRACK_DELETED,
  MIDI_TRACK_INPUT_DEVICE_ASSIGNED,
  MIDI_TRACK_ACTIVATED,
  MIDI_TRACK_DEACTIVATED,
} from '../../actions/tracks/midi'


export const midi = (state = {}, action) => {
  const {payload} = action
  
  switch (action.type) {
  case MIDI_TRACK_CREATED:
    return {...state, [payload.trackId]: newMidiTrack(payload.trackId, {recordingId: payload.recordingId})}
  case MIDI_TRACK_DELETED:
    return omit(state, payload.trackId)
  case MIDI_TRACK_INPUT_DEVICE_ASSIGNED:
    return updateMidiTrackInputDevice(state, payload.trackId, payload.deviceId)
  case MIDI_TRACK_ACTIVATED:
    return updateMidiTrackActivation(state, payload.trackId, true)
  case MIDI_TRACK_DEACTIVATED:
    return updateMidiTrackActivation(state, payload.trackId, false)
  // case TRACK_ADDED_TO_TIMELINE:
  // case TRACK_REMOVED_FROM_TIMELINE:
  // case TRACK_OUTPUT_DEVICE_UPDATED:
  // case TRACK_TEMPO_UPDATED:
  // case TRACK_TIME_SIGNATURE_UPDATED:
  // case TRACK_SELECTION_ADDED:
  // case TRACK_SELECTION_UPDATED:
  // case TRACK_SELECTION_DELETED:
  // case TIMELINE_SCRUBBER_POSITION_UPDATED:
  // case TRACK_RECORDING_STARTED:
  // case TRACK_RECORDING_STOPPED:
  // case RECORDING_ADDED_TO_TRACK: // tracks will only have one recording
  default:
    return state
  }
}

export const updateMidiTrackInputDevice = (state, trackId, deviceId) => ({
  ...state,
  [trackId]: {
    ...get(state, trackId, {}),
    inputDeviceId: deviceId,
  },
})

export const updateMidiTrackActivation = (state, trackId, activated) => ({
  ...state,
  [trackId]: {
    ...get(state, trackId, {}),
    activated,
  },  
})
