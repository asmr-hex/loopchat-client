import uuidV4 from 'uuid/v4'


export const MIDI_TRACK_CREATED = 'MIDI_TRACK_CREATED'
export const MIDI_TRACK_DELETED = 'MIDI_TRACK_DELETED'

export const createMidiTrack = (id = uuidV4()) => dispatch =>
  dispatch({
    type: MIDI_TRACK_CREATED,
    payload: {id},
  })

export const deleteMidiTrack = id => dispatch =>
  dispatch({
    type: MIDI_TRACK_DELETED,
    payload: {id},
  })

