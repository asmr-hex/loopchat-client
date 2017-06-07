import {merge, get, set} from 'lodash'
import {
  MIDI_EVENT_RECORDED,
  MIDI_RECORDING_CREATED,
  MIDI_OVERDUB_RECORDING_STOPPED, MIDI_OVERDUB_RECORDING_STARTED
} from '../../../actions/recordings/midi/midi'

export const midi = (state = {}, action) => {
  switch (action.type) {
  case MIDI_RECORDING_CREATED:
    return createMidiRecording(state, action.payload.recording)
  case MIDI_OVERDUB_RECORDING_STARTED:
    return createOverdub(state, action.payload.recordingId, action.payload.overdub)
  case MIDI_OVERDUB_RECORDING_STOPPED:
    // TODO (cw|5.30.2017) consolidate overdubs into master
    return state
  case MIDI_EVENT_RECORDED:
    return recordEvent(state, action.payload.recordingId, action.payload.overdubId, action.payload.event)
  default:
    return state
  }
}

export const createMidiRecording = (state, recording) => ({
  ...state,
  [recording.id]: recording,
})

export const createOverdub = (state, recordingId, overdub) =>
  merge(state, {[recordingId]: {overdubs: {recording: {[overdub.id]: overdub }}}})

export const recordEvent = (state, recordingId, overdubId, midiEvent) => {
  const events = get(state, `${recordingId}.overdubs.recording.${overdubId}.events`)

  return set({...state}, `${recordingId}.overdubs.recording.${overdubId}.events`, [...events, midiEvent])
}

export const processRecording = (state, recordingId, overdubId) => {
  const unprocessedRecording = get(state, `${recordingId}`)
  const unproccessedOverdub = get(recording, `overdubs.recording.${overdubId}`)

  // process overdub times
  const overdub = processOverdub(unprocessedOverdub)

  // remove overdub from recording and put in recorded
  
}

export const processOverdub = overdub => ({
  ...overdub,
  events: map(
    overdub.events,
    event => {
      event.time -= overdub.startTime
      return event
    },
  )
})