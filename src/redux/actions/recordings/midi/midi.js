import uuidV4 from  'uuid/v4'
import tone from 'tone'
import {recordingStatus} from '../../../../types/recording'

export const MIDI_RECORDING_STARTED = 'MIDI_RECORDING_STARTED'
export const startMidiRecording = (deviceId, recordingId = uuidV4(), startTime = tone.now())=> dispatch => {
  dispatch({
    type: MIDI_RECORDING_STARTED,
    payload: {
      id: recordingId,
      input: deviceId,
      start: startTime,
      status: recordingStatus.IN_PROGRESS,
      events: [],
    },
  })
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