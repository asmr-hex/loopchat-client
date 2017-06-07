import uuidV4 from  'uuid/v4'
import {newOverdub, newRecording} from '../../../../types/recording'

export const MIDI_RECORDING_CREATED = 'MIDI_RECORDING_CREATED'
export const MIDI_OVERDUB_RECORDING_STARTED = 'MIDI_OVERDUB_RECORDING_STARTED'
export const MIDI_OVERDUB_RECORDING_STOPPED = 'MIDI_OVERDUB_RECORDING_STOPPED'
export const MIDI_EVENT_RECORDED = 'MIDI_EVENT_RECORDED'

/**
 * startNewMidiRecording creates a new midi recording and automatically
 * begins a new overdub recording.
 *
 * @param deviceId: the id of the input midi device being recorded. This is not
 *                  stored in the redux store, but rather intercepted by the midi
 *                  middleware.
 * @param recordingId
 * @param overdubId
 */
export const startNewMidiRecording = (
  deviceId,
  recordingId = uuidV4(),
  overdubId = uuidV4(),
) => dispatch => {
  // start a new recording
  dispatch({
    type: MIDI_RECORDING_CREATED,
    payload: {
      input: deviceId,
      recording: newRecording(recordingId),
    }
  })
  // start a new initial overdub for this recording
  dispatch(startMidiOverdub(deviceId, recordingId, overdubId))
}

/**
 * startMidiOverdub creates a new overdub recording within a given recording.
 *
 * @param deviceId: the id of the input midi device being recorded. This is not
 *                  stored in the redux store, but rather intercepted by the midi
 *                  middleware.
 * @param recordingId: the id of the recording for which this is an overdub.
 * @param overdubId (optional)
 */
export const startMidiOverdub = (deviceId, recordingId, overdubId = uuidV4(), timeOffset = 0) => dispatch => {
  dispatch({
    type: MIDI_OVERDUB_RECORDING_STARTED,
    payload: {
      input: deviceId,
      recordingId,
      overdub: newOverdub(overdubId, timeOffset)
    }
  })
}

/**
 * stopMidiOverdub stops recording an overdub.
 *
 * @param deviceId
 * @param recordingId
 * @param overdubId
 */
export const stopMidiOverdub = (deviceId, recordingId, overdubId) => dispatch => {
  dispatch({
    type: MIDI_OVERDUB_RECORDING_STOPPED,
    payload: {
      input: deviceId,
      recordingId,
      overdubId,
    }
  })
}

/**
 * recordMidiEvent records a midi event to a recording overdub. This action should
 * only be used by the midi-middleware.
 *
 * @param recordingId
 * @param overdubId
 * @param midiEvent
 */
export const recordMidiEvent = (recordingId, overdubId, midiEvent) => dispatch => {
  dispatch({
    type: MIDI_EVENT_RECORDED,
    payload: {
      recordingId,
      overdubId,
      event: midiEvent,
    }
  })
}