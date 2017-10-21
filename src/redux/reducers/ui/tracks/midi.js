import {omit} from 'lodash'
import {newTrack} from '../../../../types/track'
import {MIDI_TRACK_CREATED, MIDI_TRACK_DELETED} from '../../../actions/tracks/tracks'


export const midi = (state = {}, action) => {
  const {payload} = action
  
  switch (action.type) {
  case MIDI_TRACK_CREATED:
    return {...state, [payload.id]: newTrack(payload.id)}
  case MIDI_TRACK_DELETED:
    return omit(state, payload.id)
  // case HIDE_MIDI_KEYBOARD_UNDERLAY:
  // case SHOW_MIDI_KEYBOARD_UNDERLAY:
  default:
    return state
  }
}
