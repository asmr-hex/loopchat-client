// the REGISTERED_MIDI_OUTPUT_DEVICE action is dispatched by the midiDevice middleware
export const REGISTERED_MIDI_OUTPUT_DEVICE = 'REGISTERED_MIDI_OUTPUT_DEVICE'
export const registerMidiOutputDevice = device => dispatch => {
  dispatch({
    type: REGISTERED_MIDI_OUTPUT_DEVICE,
    payload: device,
  })
}

// the UNREGISTERED_MIDI_OUTPUT_DEVICE action is dispatched by the midiDevice middleware
export const UNREGISTERED_MIDI_OUTPUT_DEVICE = 'UNREGISTERED_MIDI_OUTPUT_DEVICE'
export const unregisterMidiOutputDevice = device => dispatch => {
  dispatch({
    type: UNREGISTERED_MIDI_OUTPUT_DEVICE,
    payload: device,
  })
}
