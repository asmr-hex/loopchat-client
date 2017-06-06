import {
  MIDI_EVENT_RECORDED,
  MIDI_RECORDING_STARTED,
  MIDI_RECORDING_STOPPED
} from '../../../actions/recordings/midi/midi'

export const midi = (state = {}, action) => {
  switch (action.type) {
  case MIDI_RECORDING_STARTED:
    return {...state, [action.payload.id]: action.payload }
  case MIDI_RECORDING_STOPPED:
    // TODO (cw|5.30.2017) consolidate overdubs into master
    return state
  case MIDI_EVENT_RECORDED:
    return recordEvent(state, action.payload.id, action.payload.event)
  default:
    return state
  }
}

export const recordEvent = (state, recordingId, midiEvent) => {
  return {
    ...state,
    [recordingId]: {
      ...state[recordingId],
      events: [...state[recordingId].events, midiEvent]
    }
  }
}

export const

