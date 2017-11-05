import uuidV4 from  'uuid/v4'
import {map} from 'lodash'
import {newRecording, newOverdub} from '../../../../types/recording'
import {startPlayback, stopPlayback} from '../../timelines/timelines'


export const MIDI_RECORDING_CREATED = 'MIDI_RECORDING_CREATED'
export const MIDI_RECORDING_CREATED_BY_PEER = 'MIDI_RECORDING_CREATED_BY_PEER'
export const MIDI_OVERDUB_RECORDING_STARTED = 'MIDI_OVERDUB_RECORDING_STARTED'
export const MIDI_OVERDUB_RECORDING_STARTED_BY_PEER = 'MIDI_OVERDUB_RECORDING_STARTED_BY_PEER'
export const MIDI_OVERDUB_RECORDING_STOPPED = 'MIDI_OVERDUB_RECORDING_STOPPED'
export const MIDI_OVERDUB_RECORDING_STOPPED_BY_PEER = 'MIDI_OVERDUB_RECORDING_STOPPED_BY_PEER'
export const MIDI_EVENT_RECORDED = 'MIDI_EVENT_RECORDED'
export const MIDI_EVENT_RECORDED_BY_PEER = 'MIDI_EVENT_RECORDED_BY_PEER'

/**
 * createNewMidiRecording create a new midi recording.
 * 
 * @param recordingId :: string
*/
export const createNewMidiRecording = (recordingId = uuidV4()) => dispatch =>
  dispatch({
    type: MIDI_RECORDING_CREATED,
    payload: {
      recording: newRecording(recordingId),
    }
  })

export const startMidiOverdubs = (recordingContexts, timelineId) => dispatch => {
  // start overdub recording
  dispatch({
    type: MIDI_OVERDUB_RECORDING_STARTED,
    payload: {
      recordingContexts: map(
        recordingContexts,
        recordingContext => ({...recordingContext, overdub: newOverdub(uuidV4(), 0)}), // TODO (cw|10.29.2017) parameterize timeOffset
      ),
      timelineId,
    },
  })

  // also start playback
  dispatch(startPlayback(timelineId))
}

export const stopMidiOverdubs = (recordingContexts, timelineId) => dispatch => {
  // stop overdub recording
  dispatch({
    type: MIDI_OVERDUB_RECORDING_STOPPED,
    payload: {
      recordingContexts,
      timelineId,
    },
  })

  // also stop playback
  dispatch(stopPlayback(timelineId))
}

/**
 * recordMidiEvent records a midi event to a recording overdub. This action should
 * only be used by the midi-middleware.
 *
 * @param recordingId
 * @param overdubId
 * @param midiEvent
 */
export const recordMidiEvent = (overdubId, midiEvent) => dispatch => {
  dispatch({
    type: MIDI_EVENT_RECORDED,
    payload: {
      overdubId,
      event: midiEvent,
    }
  })
}
