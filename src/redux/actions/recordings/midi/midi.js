import uuidV4 from  'uuid/v4'
import tone from 'tone'
import {newRecording, recordingStatus} from '../../../../types/recording'

export const MIDI_RECORDING_STARTED = 'MIDI_RECORDING_STARTED'
export const createMidiRecording = (
  deviceId,
  recordingId = uuidV4(),
  overdubId = uuidV4,
  startTime = tone.now()
) => dispatch => {
  // start a new recording
  dispatch({
    type: MIDI_RECORDING_STARTED,
    payload: {
      input: deviceId,
      recording: newRecording(recordingId, startTime),
    }
  })
  // start a new initial overdub for this recording
  dispatch(startMidiOverdub(deviceId, recordingId, overdubId))
}

export const MIDI_RECORDING_STOPPED = 'MIDI_RECORDING_STOPPED'
export const stopMidiRecording = (deviceId, recordingId) => dispatch => {
  dispatch({
    type: MIDI_RECORDING_STOPPED,
    payload: {
      id: recordingId,
      input: deviceId,
      end: tone.now(),
      status: recordingStatus.DONE,
    }
  })
}

export const MIDI_OVERDUB_STARTED = 'MIDI_OVERDUB_STARTED'
export const startMidiOverdub = (deviceId, recordingId, overdubId = uuidV4()) => dispatch => {
  dispatch({
    type: MIDI_OVERDUB_STARTED,
    payload: {
      input: deviceId,
      recordingId,
      overdubId,
    }
  })
}

export const MIDI_EVENT_RECORDED = 'MIDI_EVENT_RECORDED'
export const recordMidiEvent = (recordingId, midiEvent) => dispatch => {
  dispatch({
    type: MIDI_EVENT_RECORDED,
    payload: {
      id: recordingId,
      event: midiEvent,
    }
  })
}