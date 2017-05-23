
// the CONNECT_MIDI_DEVICES action is handled by the midiMiddleware, so there
// is no reducer which catches this case.
export const CONNECT_MIDI_DEVICES = 'CONNECT_MIDI_DEVICES'
export const connectMidiDevices = () => dispatch => {
  dispatch({
    type: CONNECT_MIDI_DEVICES,
  })
}

// the ADD_MIDI_EVENT_HANDLER action is handled by the midiMiddleware, so there
// is no corresponding reducer.
export const ADD_MIDI_EVENT_HANDLER = 'ADD_MIDI_EVENT_HANLDER'
export const addMidiEventHandler = handler => dispatch => {
  dispatch({
    type: ADD_MIDI_EVENT_HANDLER,
    payload: handler,
  })
}

// the REGISTERED_MIDI_DEVICE action is dispatched by the midiDevice middleware
export const REGISTERED_MIDI_DEVICE = 'REGISTERED_MIDI_DEVICE'
export const registerMidiDevice = device => dispatch => {
  dispatch({
    type: REGISTERED_MIDI_DEVICE,
    payload: device,
  })
}

// the UNREGISTERED_MIDI_DEVICE action is dispatched by the midiDevice middleware
export const UNREGISTERED_MIDI_DEVICE = 'UNREGISTERED_MIDI_DEVICE'
export const unregisterMidiDevice = device => dispatch => {
  dispatch({
    type: UNREGISTERED_MIDI_DEVICE,
    payload: device,
  }) 
}

