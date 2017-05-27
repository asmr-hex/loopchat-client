
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
export const ADD_MIDI_EVENT_HANDLER = 'ADD_MIDI_EVENT_HANDLER'
export const addMidiEventHandler = (handler, deviceId) => dispatch => {
  dispatch({
    type: ADD_MIDI_EVENT_HANDLER,
    payload: {
      deviceId,
      handler,
    },
  })
}

// the ACTIVATE_MIDI_INPUT_DEVICE action is handled in *both* the midiMiddleware
// as well as in the input midi reducer to track the activation status of a device.
export const ACTIVATE_MIDI_INPUT_DEVICE = 'ACTIVATE_MIDI_INPUT_DEVICE'
export const activateMidiInputDevice = deviceId => dispatch => {
  dispatch({
    type: ACTIVATE_MIDI_INPUT_DEVICE,
    payload: deviceId,
  })
}

// the DEACTIVATE_MIDI_INPUT_DEVICE action is handled in *both* the midiMiddleware
// as well as in the input midi reducer to track the activation status of a device.
export const DEACTIVATE_MIDI_INPUT_DEVICE = 'DEACTIVATE_MIDI_INPUT_DEVICE'
export const deactivateMidiInputDevice = deviceId => dispatch => {
  dispatch({
    type: DEACTIVATE_MIDI_INPUT_DEVICE,
    payload: deviceId,
  })
}