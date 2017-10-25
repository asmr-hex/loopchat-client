import {get, values} from 'lodash'
import {newMidiInputDevice} from '../../../types/midiDevice'


export const getMidiInputDevices = state =>
  [newMidiInputDevice('No Input'), ...values(get(state, `midi.input`, {}))]
