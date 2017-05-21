
// the REGISTERED_MIDI_DEVICE action is dispathed by the midiDevice middleware
export const REGISTERED_MIDI_DEVICE = 'REGISTERED_MIDI_DEVICE'
export const registerMidiDevice = device => dispatch => {
  dispatch({
    type: REGISTERED_MIDI_DEVICE,
    payload: device,
  })
}

// the UNREGISTERED_MIDI_DEVICE action is dispathed by the midiDevice middleware
export const UNREGISTERED_MIDI_DEVICE = 'UNREGISTERED_MIDI_DEVICE'
export const unregisterMidiDevice = device => dispatch => {
  dispatch({
    type: UNREGISTERED_MIDI_DEVICE,
    payload: device,
  }) 
}

