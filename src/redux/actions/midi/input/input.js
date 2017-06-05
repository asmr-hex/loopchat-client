// the REGISTERED_MIDI_INPUT_DEVICE action is dispatched by the midiDevice middleware
export const REGISTERED_MIDI_INPUT_DEVICE = 'REGISTERED_MIDI_INPUT_DEVICE'
export const registerMidiInputDevice = device => dispatch => {
  dispatch({
    type: REGISTERED_MIDI_INPUT_DEVICE,
    payload: device,
  })
}

// the UNREGISTERED_MIDI_INPUT_DEVICE action is dispatched by the midiDevice middleware
export const UNREGISTERED_MIDI_INPUT_DEVICE = 'UNREGISTERED_MIDI_INPUT_DEVICE'
export const unregisterMidiInputDevice = device => dispatch => {
  dispatch({
    type: UNREGISTERED_MIDI_INPUT_DEVICE,
    payload: device,
  })
}

